<template>
  <h2 class="font-bold text-title mb-8">
    {{ selectedSpace.title }}
  </h2>

  <div>
    <div
      v-for="(ticket, key) in tickets"
      :key="key"
    >
      {{ ticket }}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'TicketList',
  components: {},
  data: () => ({}),
  computed: {
    ...mapState(['selectedSpace', 'tickets'])
  }
};
</script>

<style lang="scss" scoped></style>
