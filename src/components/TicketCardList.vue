<template>
  <div class="bg-white p-5 rounded flex flex-col justify-between">
    <p class="font-bold pb-2">
      Tickets {{ state.label.toLowerCase() }}
    </p>

    <div
      v-if="tickets.length"
      class="grid grid-cols-1 gap-2 h-full auto-rows-max"
    >
      <div
        v-for="(ticket, key) in filteredTicketsList"
        :key="key"
        class="cursor-pointer truncate"
        @click="$router.push(`/tickets/${ticket.slug}`)"
      >
        <span :class="`px-2.5 py-1 rounded font-bold text-xs ${state.style}`">{{ ticket.slug }}</span> 
        {{ ticket.title }}
      </div>
    </div>

    <template v-else>
      <p class="text-gray text-center pb-2">
        Vous n’avez aucun ticket {{ state.label.toLowerCase() }}
      </p>

      <Button
        class="bg-black text-white mx-auto hover:bg-opacity-85"
        @click="createNewTicket()"
      >
        Créer un ticket
      </Button>
    </template>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Button from '../components/Button.vue';
import { incrementTicketsNumber, addTicketDocument } from '../utils/firestore';

export default {
  name: 'TicketCardList',
  components: {
    Button
  },
  props: {
    state: {
      type: Object,
      default: null
    },
    tickets: {
      type: Array,
      required: true
    }
  },
  data: () => ({}),
  computed: {
    ...mapState(['connectedUser', 'selectedSpace', 'spaces']),
    filteredTicketsList(){
      return _.take(this.tickets, 6);
    }
  },
  methods: {
    ...mapActions(['setSelectedSpace']),
    async createNewTicket() {
      await this.updateTicketsNumber();

      const formattedTitle = this.selectedSpace.title.replace(/\s/g, "").toUpperCase().substring(0, 4);
      const slug = `${formattedTitle}-${this.selectedSpace.ticketsNumber}`;
      await addTicketDocument(this.connectedUser.uid, this.selectedSpace.id, slug);

      this.$router.push(`/tickets/${slug}`);
    },
    updateTicketsNumber() {
      incrementTicketsNumber(this.connectedUser.uid, this.selectedSpace.id);

      const updatedSelectedSpace = this.spaces.find(space => space.id === this.selectedSpace.id);
      this.setSelectedSpace(updatedSelectedSpace);
    }
  }
};
</script>

<style lang="scss" scoped></style>
