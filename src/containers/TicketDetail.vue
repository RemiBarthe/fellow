<template>
  <button
    class="px-2.5 py-1 rounded text-black text-title md:text-base-lg 
    hover:bg-gray transition-colors duration-200 ease-in-out tooltip tooltip-top"
    data-title="Retour aux tickets"
    @click="$router.push('/tickets')"
  >
    <Icon icon="akar-icons:arrow-left" />
  </button>

  <template v-if="currentTicket">
    <h2
      class="font-bold text-title mb-5 flex flex-wrap items-center relative"
    >
      <span
        :class="`px-2.5 py-1 rounded font-bold text-base leading-4 tooltip tooltip-bottom cursor-pointer transition-colors delay-100 duration-700 ease-in-out ${radioTabStyle}`"
        data-title="Modifier le slug"
        @click="showEditSlugModal = true"
      >{{ currentTicket.slug }}</span>

      <Modal
        v-if="showEditSlugModal"
        @closeModal="showEditSlugModal = false"
      >
        <h2 class="text-title font-bold mb-5">
          Modifier le slug
        </h2>

        <input
          v-model="slugCurrentTicket"
          type="text"
          class="text-base w-full border-2 border-primary rounded-xl px-2.5 py-1"
          @keyup.enter.prevent="editSlug()"
          @keyup.esc="closeEditSlugModal()"
        >
        <p
          class="flex relative justify-end right-4 font-bold text-sm cursor-pointer"
          @click="editSlug()"
        >
          <Icon
            icon="fluent:arrow-enter-left-24-filled"
            class="mr-1 mt-1"
          />
          Valider
        </p>

        <p
          class="flex relative justify-end right-4 text-sm cursor-pointer"
          @click="closeEditSlugModal()"
        >
          <Icon
            icon="mdi:keyboard-esc"
            class="mr-1 mt-1"
          />
          Annuler
        </p>
      </Modal>

      <contenteditable
        v-model="currentTicket.title"
        tag="span"
        class="px-2.5 py-1 rounded"
        :no-n-l="true"
        :no-h-t-m-l="true"
        @input="updateTicket"
      />
    </h2>

    <div class="flex flex-wrap justify-between items-end mb-2.5">
      <p class="text-sm text-left text-gray">
        Créé {{ formatDate(currentTicket.creationDate) }}
        <br> Dernière édition {{ formatDate(currentTicket.updateDate) }}
      </p>

      <div :class="`text-sm md:text-base w-fit p-1 rounded flex gap-1 transition-colors delay-100 duration-700 ease-in-out ${radioTabStyle}`">
        <button
          v-for="state in ticketStates"
          :key="state.key"
          class="px-2.5 py-1 rounded"
          :class="[state.key === currentTicket.state ? 'bg-white text-black font-bold' : 'hover:bg-white hover:bg-opacity-20' ]"
          @click="updateTicketState(state.key)"
        >
          {{ state.label }}
        </button>
      </div>
    </div>

    <QuillEditor
      v-model:content="currentTicket.content"
      content-type="html"
      theme="bubble"
      toolbar="essential"
      class="text-base"
      @textChange="updateTicket"
    />

    <TodoList />

    <button
      class="px-2.5 py-1 rounded text-thirdary text-title float-right
      hover:bg-thirdary hover:bg-opacity-20 transition-colors duration-200 ease-in-out mt-4 mb-4 tooltip tooltip-bottom"
      data-title="Supprimer le ticket"
      @click="showDeleteModal = true"
    >
      <Icon icon="fluent:delete-16-regular" /> 
    </button>

    <Modal
      v-if="showDeleteModal"
      @closeModal="showDeleteModal = false"
    >
      <h3 class="text-base-lg font-bold mb-5">
        Suppression du ticket
      </h3>

      <p class="mb-5">
        <span class="font-bold text-thirdary">Attention : </span> cette action est irréversible.
        <br> Êtes-vous sur de vouloir <span class="font-bold">supprimer</span> votre ticket <span class="font-bold">{{ currentTicket.title }}</span> définitivement ?
      </p>

      <div class="flex justify-end gap-1">
        <Button
          class="bg-black bg-opacity-0 hover:bg-opacity-20 transition-colors duration-200"
          @click="showDeleteModal=false"
        >
          Annuler
        </Button>

        <Button
          class="bg-thirdary text-white hover:bg-opacity-90 transition-colors duration-200"
          @click="deleteTicket()"
        >
          Supprimer définitivement
        </Button>
      </div>
    </Modal>
  </template>
</template>

<script>
import _ from "lodash";
import { mapState } from "vuex";
import { setTicketDocument, deleteTicketDocument } from '../utils/firestore';
import contenteditable from 'vue-contenteditable';
import { Icon } from '@iconify/vue';
import Modal from '../components/Modal.vue';
import Button from '../components/Button.vue';
import moment from 'moment';
import { TICKET_STATES } from "../utils/ticketStates";
import TodoList from "../components/TodoList.vue";
import statisticsMixin from "../mixins/statisticsMixin";

export default {
  name: 'TicketList',
  components: {
    contenteditable,
    Icon,
    Modal,
    Button,
    TodoList
  },
  mixins: [statisticsMixin],
  data: () => ({
    routePath: '',
    blockFirstEdit: false,
    ticketStates: TICKET_STATES,
    slugCurrentTicket: '',
    showEditSlugModal: false,
    showDeleteModal: false
  }),
  computed: {
    ...mapState(['tickets', 'connectedUser', 'selectedSpace']),
    currentTicket() {
      return this.tickets.find(ticket => ticket.slug === this.$route.params.slug);
    },
    radioTabStyle(){
      if(this.currentTicket)
        return this.ticketStates.find(state => state.key === this.currentTicket.state).style;
      
      return '';
    }
  },
  watch: {
    currentTicket(ticket) {
      if(!ticket && this.$route.path === this.routePath){
        this.$router.push('/tickets');
      }
    }
  },
  mounted(){
    this.routePath = this.$route.path;
    setTimeout(() => {
      if(!this.currentTicket){
        this.$router.push('/404');
      }

      else{
        this.slugCurrentTicket = this.currentTicket.slug;

        if(this.currentTicket.content){
          this.blockFirstEdit = true;
        }
      }
    }, 200);
  },
  methods: {
    updateTicket: _.debounce(function() {
      // blockFirstEdit cause QuillEditor trigger textChange when populating itself
      if(!this.blockFirstEdit){
        this.currentTicket.updateDate = new Date();
        setTicketDocument(this.connectedUser.uid, this.selectedSpace.id, this.currentTicket);
        this.updateStatistics(this.connectedUser.uid, this.selectedSpace.id, this.tickets);
      }
      this.blockFirstEdit = false;
    }, 1000),
    formatDate(date){
      if (typeof date.toDate !== "undefined") { 
        return moment(date.toDate()).locale('fr').fromNow();
      }
    },
    deleteTicket() {
      deleteTicketDocument(this.connectedUser.uid, this.selectedSpace.id, this.currentTicket);
      this.updateStatistics(this.connectedUser.uid, this.selectedSpace.id, this.tickets);
    },
    updateTicketState(state){
      this.currentTicket.state = state;
      this.updateTicket();
    },
    editSlug() {
      this.showEditSlugModal = false;
      const copiedCurrentTicket = Object.assign({}, this.currentTicket);
      copiedCurrentTicket.slug = this.slugCurrentTicket;
      copiedCurrentTicket.updateDate = new Date();
      setTicketDocument(this.connectedUser.uid, this.selectedSpace.id, copiedCurrentTicket);
      this.$router.push('/tickets/' + this.slugCurrentTicket);
    },
    closeEditSlugModal(){
      this.slugCurrentTicket = this.currentTicket.slug;
      this.showEditSlugModal = false;
    }
  }
};
</script>

<style lang="scss">
div .ql-container{
  height:auto;
  font-size: inherit;
  font-family: 'Roboto', 'sans-serif';

.ql-editor{
    padding: 1.25rem;
    min-height: 300px;
    border-radius: 1.25rem;
    background-color: white;
    border: 2px solid white;

    &:focus{
      border-color: theme('colors.primary');
    }

    h1{
      font-size: 2rem;
      line-height: 2.5rem;
      font-weight: 700;
    }

    h2{
      font-weight: 700;
    }
  }

  .ql-clipboard {
    position: fixed;
    display: none;
    left: 50%;
    top: 50%;
  }
}
</style>
