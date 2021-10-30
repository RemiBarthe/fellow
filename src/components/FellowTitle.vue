<template>
  <h1 class="flex font-black justify-center text-title-lg select-none">
    {{ title }}<span class="text-primary">.</span>
  </h1>
</template>

<script>
export default {
  name: 'Title',
  props: {
    short: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data: () => ({
    shortTitle: 'f',
    regularTitle: 'fellow'
  }),
  computed: {
    title() {
      return this.short ? this.shortTitle : this.regularTitle;
    }
  }
};
</script>

<style scoped></style>
