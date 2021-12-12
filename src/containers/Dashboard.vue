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
      

      <div class="w-48 sm:w-72 mx-auto">
        <p class="font-bold pb-2 text-center">
          Tickets totaux
        </p>
        <vc-donut
          :sections="ticketStatisticsDonut"
          :total="ticketCount"
          :has-legend="true"
          :size="100"
          unit="%"
          :thickness="45"
        >
          <p class="font-bold text-base leading-3">
            <span class="text-title">{{ ticketCount }}</span><br>tickets
          </p>
        </vc-donut>
      </div>

      <LineChart
        :chart-data="ticketsInTime"
        class="max-h-60"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Button from '../components/Button.vue';
import TicketCardList from '../components/TicketCardList.vue';
import { TICKET_STATES } from "../utils/ticketStates";
import { getStatisticsDocument } from '../utils/firestore';
import { LineChart } from 'vue-chart-3';
import moment from 'moment';

export default {
  name: 'Dashboard',
  components: {
    Button,
    TicketCardList,
    LineChart
  },
  data: () => ({
    ticketStates: TICKET_STATES,
    ticketsInTime: {
      labels: [],
      datasets: [
        {
          label: 'À faire',
          data: [],
          borderColor: '#59C3C3',
          backgroundColor: '#59C3C3',
          tension: 0.4
        },
        {
          label: 'En cours',
          data: [],
          borderColor: '#4062BB',
          backgroundColor: '#4062BB',
          tension: 0.4
        },
        {
          label: 'Bloqué',
          data: [],
          borderColor: '#F45B69',
          backgroundColor: '#F45B69',
          tension: 0.4
        },
        {
          label: 'Terminé',
          data: [],
          borderColor: '#B0B0B0',
          backgroundColor: '#B0B0B0',
          tension: 0.4
        },
      ],
    }
  }),
  computed: {
    ...mapState(['connectedUser', 'selectedSpace', 'tickets']),
    inprogressTickets(){
      return this.tickets.filter(ticket => ticket.state === this.ticketStates[1].key);
    },
    todoTickets(){
      return this.tickets.filter(ticket => ticket.state === this.ticketStates[0].key);
    },
    ticketCount(){
      return this.tickets.length;
    },
    ticketStatisticsDonut(){
      const countTicketState = {
        todo: 0,
        done: 0,
        bloqued: 0,
        inprogress: 0
      };
      this.tickets.map(ticket => {
        countTicketState[ticket.state]++;
      });

      const sectionTicketStats = [
        { label: 'À faire', value: countTicketState.todo, color: '#59C3C3' },
        { label: 'Bloqué', value: countTicketState.bloqued, color: '#F45B69' },
        { label: 'Terminé', value: countTicketState.done, color: '#B0B0B0' },
        { label: 'En cours', value: countTicketState.inprogress, color: '#4062BB' },

      ];
      
      return sectionTicketStats;
    }
  },
  watch: {
    selectedSpace() {
      this.setTicketsInTimeData();
    }
  },
  created(){
    this.setTicketsInTimeData();
  },
  methods: {
    async setTicketsInTimeData(){
      const monthYearDate =  moment(new Date()).format("MMYY");
      const statistics = await getStatisticsDocument(this.connectedUser.uid, this.selectedSpace.id, monthYearDate);

      if(statistics){
        this.ticketsInTime.labels = statistics.labels;
        this.ticketsInTime.datasets[0].data = statistics.todo;
        this.ticketsInTime.datasets[1].data = statistics.inprogress;
        this.ticketsInTime.datasets[2].data = statistics.bloqued;
        this.ticketsInTime.datasets[3].data = statistics.done;

      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
