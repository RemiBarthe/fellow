<template>
  <h2 class="font-bold text-title mb-8">{{ selectedSpace.title }}</h2>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'TicketList',
  components: {},
  data: () => ({}),
  computed: {
    ...mapState(['selectedSpace'])
  }
};
</script>

<style lang="scss" scoped></style>
