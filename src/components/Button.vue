<template>
  <button class="px-5 py-1.5 rounded flex items-center select-none">
    <Icon
      v-if="icon"
      :icon="icon"
      class="mr-2"
    />
    <slot />
  </button>
</template>

<script>
import { Icon } from '@iconify/vue';

export default {
  name: 'Button',
  components: {
    Icon
  },
  props: {
    icon: {
      type: String,
      default: null
    }
  }
};
</script>

<style scoped></style>
