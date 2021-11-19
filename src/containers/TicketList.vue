<template>
  <h2 class="font-bold text-title mb-8">
    {{ selectedSpace.title }}
  </h2>

  <div class="grid gap-2.5 justify-start grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 items-center w-fit mx-auto">
    <p
      class="cursor-pointer rounded p-2 max-w-xs flex justify-end items-end createTicket h-full select-none"
      @click="createNewTicket"
    >
      <Icon
        icon="akar-icons:plus"
        class="mr-1 text-base-lg float-left mb-0.5"
      />
      Créer un ticket
    </p>

    <div
      v-for="ticket in tickets"
      :key="ticket.slug"
      class="rounded p-5 max-w-xs h-full cursor-pointer flex flex-col justify-between"
      :class="[
        ticket.state === ticketStates[0].key ? ticketStates[0].style : '',
        ticket.state === ticketStates[1].key ? ticketStates[1].style : '',
        ticket.state === ticketStates[2].key ? ticketStates[2].style : '',
        ticket.state === ticketStates[3].key ? ticketStates[3].style : '',
      ]"
      @click="$router.push(`/tickets/${ticket.slug}`)"
    >
      <p class="text-right mb-4">
        {{ formatDate(ticket.creationDate) }}
      </p>
      <p class="leading-4">
        <span class="text-xs font-bold">{{ ticket.slug }}</span>
        <br>{{ ticket.title }}
      </p>
    </div>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue';
import { mapState, mapActions } from 'vuex';
import { incrementTicketsNumber, addTicketDocument } from '../utils/firestore';
import moment from 'moment';
import { TICKET_STATES } from "../utils/ticketStates";


export default {
  name: 'TicketList',
  components: {
    Icon
  },
  data: () => ({
    ticketStates: TICKET_STATES
  }),
  computed: {
    ...mapState(['selectedSpace', 'tickets', 'connectedUser', 'spaces'])
  },
  methods: {
    ...mapActions(['setSelectedSpace']),
    async createNewTicket() {
      await this.updateTicketsNumber();

      const formattedTitle = this.selectedSpace.title.replace(/\s/g, "").toUpperCase().substring(0, 4);
      const slug = `${formattedTitle}-${this.selectedSpace.ticketsNumber}`;
      await addTicketDocument(this.connectedUser.uid, this.selectedSpace.id, slug);
    },
    updateTicketsNumber() {
      incrementTicketsNumber(this.connectedUser.uid, this.selectedSpace.id);

      const updatedSelectedSpace = this.spaces.find(space => space.id === this.selectedSpace.id);
      this.setSelectedSpace(updatedSelectedSpace);
    },
    formatDate(date){
      if (typeof date.toDate !== "undefined") { 
        return moment(date.toDate()).format("DD/MM/YY");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.createTicket {
  min-width: 145px;
}
</style>
