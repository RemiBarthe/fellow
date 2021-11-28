<template>
  <h2 class="font-bold text-title mb-5">
    {{ selectedSpace.title }}
  </h2>

  <div class="flex gap-2.5 flex-col lg:flex-row">
    <div class="flex gap-2.5 flex-col flex-1 lg:max-w-max">
      <TicketCardList
        :state="ticketStates[1]"
        :tickets="inprogressTickets"
      />

      <TicketCardList
        :state="ticketStates[0]"
        :tickets="todoTickets"
      />

      <div class="flex items-start justify-center lg:justify-end">
        <Button
          class="bg-black text-white hover:bg-opacity-85"
          @click="$router.push('/tickets')"
        >
          Voir tous les tickets
        </Button>
      </div>
    </div>

    <div class="bg-white p-5 rounded flex-1">
      <p class="font-bold pb-2">
        Statistiques
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras varius sed
        dolor ultrices mattis. Quisque vel tortor sit amet elit porta convallis
        at a ligula. <br>Ut ornare massa non magna molestie, vel consequat
        velit posuere. Donec vitae urna sed nulla euismod porta et vitae libero.
        Vestibulum sodales, quam at bibendum cursus, quam justo facilisis urna,
        id elementum dui nibh at nisi. Class aptent taciti sociosqu ad litora
        torquent per conubia nostra, per inceptos himenaeos. <br><br>Sed
        sodales malesuada ex ut varius. Curabitur pharetra vitae velit ac
        ultricies. Vestibulum lorem nisi, porta quis tempor in, tristique eu
        metus. Nulla gravida eleifend felis eget lacinia. <br>Pellentesque
        congue, dolor nec placerat rutrum, nibh risus viverra augue, vitae
        placerat lacus velit vel nibh. Nam cursus, justo in vestibulum mattis,
        risus dolor facilisis dolor, eu viverra massa dolor sed est. Sed nec
        tincidunt sapien. Suspendisse eu tortor malesuada, condimentum felis
        eget, malesuada enim.
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Button from '../components/Button.vue';
import TicketCardList from '../components/TicketCardList.vue';
import { TICKET_STATES } from "../utils/ticketStates";

export default {
  name: 'Dashboard',
  components: {
    Button,
    TicketCardList
  },
  data: () => ({
    ticketStates: TICKET_STATES
  }),
  computed: {
    ...mapState(['selectedSpace', 'tickets']),
    inprogressTickets(){
      return this.tickets.filter(ticket => ticket.state === this.ticketStates[1].key);
    },
    todoTickets(){
      return this.tickets.filter(ticket => ticket.state === this.ticketStates[0].key);
    }
  }
};
</script>

<style lang="scss" scoped></style>
