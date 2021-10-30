<template>
  <h2 class="font-bold text-title mb-8">{{ selectedSpace.title }}</h2>

  <div class="grid gap-5 grid-flow-row lg:grid-flow-col">
    <div class="bg-white p-5 rounded flex flex-col justify-between">
      <p class="font-bold pb-2">Tickets en cours</p>
      <p class="text-gray text-center pb-2">
        Vous n’avez aucun ticket en cours
      </p>
      <Button class="bg-black text-white mx-auto">Créer un ticket</Button>
    </div>

    <div class="bg-white p-5 rounded flex flex-col justify-between">
      <p class="font-bold pb-2">Tickets à faire</p>
      <p class="text-gray text-center pb-2">
        Vous n’avez aucun ticket à faire
      </p>
      <Button class="bg-black text-white mx-auto">Créer un ticket</Button>
    </div>

    <div class="flex items-start justify-end">
      <Button class="bg-black text-white">Voir tous les tickets</Button>
    </div>

    <div class="bg-white p-5 rounded row-span-3">
      <p class="font-bold pb-2">Statistiques</p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras varius sed
        dolor ultrices mattis. Quisque vel tortor sit amet elit porta convallis
        at a ligula. <br />Ut ornare massa non magna molestie, vel consequat
        velit posuere. Donec vitae urna sed nulla euismod porta et vitae libero.
        Vestibulum sodales, quam at bibendum cursus, quam justo facilisis urna,
        id elementum dui nibh at nisi. Class aptent taciti sociosqu ad litora
        torquent per conubia nostra, per inceptos himenaeos. <br /><br />Sed
        sodales malesuada ex ut varius. Curabitur pharetra vitae velit ac
        ultricies. Vestibulum lorem nisi, porta quis tempor in, tristique eu
        metus. Nulla gravida eleifend felis eget lacinia. <br />Pellentesque
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

export default {
  name: 'Dashboard',
  components: {
    Button
  },
  data: () => ({}),
  computed: {
    ...mapState(['selectedSpace'])
  }
};
</script>

<style lang="scss" scoped></style>
