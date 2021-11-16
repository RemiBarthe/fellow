<template>
  <h2 class="font-bold text-title mb-8">
    <contenteditable
      v-model="currentTicket.slug"
      tag="span"
      class="bg-primary text-white px-2.5 py-1 rounded font-bold text-base"
      :no-n-l="true"
      :no-h-t-m-l="true"
    />

    <contenteditable
      v-model="currentTicket.title"
      tag="span"
      class="px-2.5 py-1 rounded"
      :no-n-l="true"
      :no-h-t-m-l="true"
      @input="updateTicket"
    />
  </h2>

  <QuillEditor
    v-model:content="currentTicket.content"
    content-type="html"
    theme="bubble"
    toolbar="essential"
    class="text-base"
    @textChange="updateTicket"
  />
</template>

<script>
import _ from "lodash";
import { mapState } from "vuex";
import { setTicketDocument } from '../utils/firestore';
import contenteditable from 'vue-contenteditable';

export default {
  name: 'TicketList',
  components: {
    contenteditable
  },
  data: () => ({
    routePath: ''
  }),
  computed: {
    ...mapState(['tickets', 'connectedUser', 'selectedSpace']),
    currentTicket() {
      return this.tickets.find(ticket => ticket.slug === this.$route.params.slug);
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
  },
  methods: {
    updateTicket: _.debounce(function() {
      setTicketDocument(this.connectedUser.uid, this.selectedSpace.id, this.currentTicket);
    }, 1000)
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
}
</style>
