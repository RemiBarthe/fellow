<template>
  <div
    class="flex h-screen fixed top-0 left-0 right-0 bg-black bg-opacity-20 z-30"
    @click.self="closeModal"
  >
    <div
      class="m-auto max-h-full bg-white rounded p-5 overflow-y-auto z-40"
      :class="customClass"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: { 
    customClass: { 
      type: String, 
      default: '' 
    } 
  },
  emits: ['closeModal'],
  data: () => ({}),
  methods: {
    closeModal() {
      this.$emit('closeModal');
    }
  },
};
</script>

<style scoped></style>
