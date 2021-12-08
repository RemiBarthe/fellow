<template>
  <section class="flex h-screen">
    <div class="m-auto">
      <img
        v-show="animOver"
        alt="fellow animation"
        src="../assets/images/fellow-fixed.png"
        class="w-80"
      >
      <img
        v-show="!animOver"
        alt="fellow animation"
        src="../assets/images/fellow-anim.png"
        class="w-80"
      >
    </div>
  </section>
</template>

<script>
export default {
  name: 'StartAnimation',
  data: () => ({
    animOver: false
  }),
  mounted() {
    this.animateTitle();
  },
  methods: {
    animateTitle() {
      setTimeout(() => {
        this.animOver = true;

        setTimeout(() => {
          this.$store.dispatch('setStartAnimationOver', true);
        }, 1000);
      }, 2800);
    }
  }
};
</script>

<style scoped>
</style>
