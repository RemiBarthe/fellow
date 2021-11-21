<template>
  <div>
    <p>TodoList</p>
  </div>
</template>

<script>
export default {
  name: 'TodoList',
  props: {
    short: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data: () => ({
  }),
};
</script>

<style scoped></style>
