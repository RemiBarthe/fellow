<template>
  <h2 class="font-bold text-title mb-8">
    {{ selectedSpace.title }}
  </h2>

  <div class="grid gap-5 grid-flow-row lg:grid-flow-col">
    <TicketCardList status="en cours" />

    <TicketCardList status="à faire" />

    <div class="flex items-start justify-center lg:justify-end">
      <Button
        class="bg-black text-white"
        @click="$router.push('/tickets')"
      >
        Voir tous les tickets
      </Button>
    </div>

    <div class="bg-white p-5 rounded row-span-3">
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

export default {
  name: 'Dashboard',
  components: {
    Button,
    TicketCardList
  },
  data: () => ({}),
  computed: {
    ...mapState(['selectedSpace'])
  }
};
</script>

<style lang="scss" scoped></style>
