<template>
  <div class="bg-white p-5 rounded flex flex-col justify-between">
    <p class="font-bold pb-2">
      Tickets {{ status }}
    </p>
    <p class="text-gray text-center pb-2">
      Vous n’avez aucun ticket {{ status }}
    </p>
    <Button
      class="bg-black text-white mx-auto"
      @click="createNewTicket()"
    >
      Créer un ticket
    </Button>
  </div>
</template>

<script>
import Button from '../components/Button.vue';

export default {
  name: 'TicketCardList',
  components: {
    Button
  },
  props:{
    status:{
      type: String,
      default: null
    }
  },
  data: () => ({}),
  methods: {
    createNewTicket() {

    }
  }
};
</script>

<style lang="scss" scoped></style>
