<template>
  <button class="px-5 py-2.5 rounded">
    <FontAwesomeIcon v-if="icon" :icon="[icon[0], icon[1]]" class="mr-2" />
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    icon: Array
  }
};
</script>

<style scoped></style>
