<template>
  <h2 class="font-bold text-title mb-8">
    {{ selectedSpace.title }}
  </h2>

  <div class="grid gap-2.5 justify-start grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center">
    <p
      class="cursor-pointer rounded p-2 max-w-xs flex justify-end items-end createTicket"
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
      class="rounded bg-primary p-5 max-w-xs text-white"
    >
      {{ ticket }}
    </div>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue';
import { mapState } from 'vuex';

export default {
  name: 'TicketList',
  components: {
    Icon
  },
  data: () => ({}),
  computed: {
    ...mapState(['selectedSpace', 'tickets'])
  }
};
</script>

<style lang="scss" scoped>
.createTicket {
  min-width: 145px;
}
</style>
