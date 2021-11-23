<template>
  <h2 class="font-bold text-title mb-5">
    {{ selectedSpace.title }}
  </h2>

  <div class="flex flex-wrap gap-5 mb-2.5">
    <button
      v-for="state in ticketStates"
      :key="state.key"
      class="flex items-center"
      :class="[stateFilters.includes(state.key) ? 'text-black' : 'text-gray']"
      @click="updateStateFilters(state.key)"
    >
      <div
        class="w-4 h-4 rounded mr-1"
        :class="[stateFilters.includes(state.key) ? state.style : 'bg-gray']"
      />{{ state.label }}
    </button>
  </div>

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
      v-for="ticket in filteredTickets"
      :key="ticket.slug"
      class="relative overflow-hidden rounded p-5 max-w-xs h-full cursor-pointer flex flex-col justify-between"
      :class="[
        styleTicketState(ticket.state)
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

      <div
        class="absolute bottom-0 left-0 h-2 bg-white bg-opacity-20"
        :style="`width:${ticket.todoListDonePercentage}%`"
      />
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
    ticketStates: TICKET_STATES,
    stateFilters: [
      TICKET_STATES[0].key, 
      TICKET_STATES[1].key, 
      TICKET_STATES[2].key, 
      TICKET_STATES[3].key
    ]
  }),
  computed: {
    ...mapState(['selectedSpace', 'tickets', 'connectedUser', 'spaces']),
    filteredTickets(){
      return this.tickets.filter((ticket) => {
        let showTicket = false;
        this.stateFilters.forEach(filter => {
          if(ticket.state === filter)
            showTicket = true;
        });
        return showTicket;
      });
    }
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
    formatDate(date) {
      if (typeof date.toDate !== "undefined") { 
        return moment(date.toDate()).format("DD/MM/YY");
      }
    },
    updateStateFilters(state) {
      this.stateFilters = _.xor(this.stateFilters, [state]);
    },
    styleTicketState(state){
      return this.ticketStates.find(ticketState => ticketState.key === state)?.style;
    }
  }
};
</script>

<style lang="scss" scoped>
.createTicket {
  min-width: 145px;
}
</style>
