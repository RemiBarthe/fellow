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
      v-for="(ticket, key) in tickets"
      :key="key"
      class="rounded bg-primary p-5 max-w-xs text-white h-full cursor-pointer flex flex-col justify-between"
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
import { incrementTicketsNumber, setTicketDocument } from '../utils/firestore';
import moment from 'moment';

export default {
  name: 'TicketList',
  components: {
    Icon
  },
  data: () => ({}),
  computed: {
    ...mapState(['selectedSpace', 'tickets', 'connectedUser', 'spaces'])
  },
  methods: {
    ...mapActions(['setSelectedSpace']),
    async createNewTicket() {
      await this.updateTicketsNumber();

      const formattedTitle = this.selectedSpace.title.replace(/\s/g, "").toUpperCase().substring(0, 4);
      const slug = `${formattedTitle}-${this.selectedSpace.ticketsNumber}`;
      await setTicketDocument(this.connectedUser.uid, this.selectedSpace.id, slug);
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
