<template>
  <button class="px-5 py-2.5 rounded flex items-center">
    <Icon v-if="icon" :icon="icon" class="mr-2" />
    <slot></slot>
  </button>
</template>

<script>
import { Icon } from '@iconify/vue';

export default {
  name: 'Button',
  props: {
    icon: String
  },
  components: {
    Icon
  }
};
</script>

<style scoped></style>
