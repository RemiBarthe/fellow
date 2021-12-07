<template>
  <section class="flex h-screen">
    <div class="m-auto">
      <img
        v-show="animOver"
        alt="fellow animation"
        :src="fellowFixed"
        class="w-80"
      >
      <img
        v-show="!animOver"
        alt="fellow animation"
        :src="fellowAnim"
        class="w-80"
      >
    </div>
  </section>
</template>

<script>
export default {
  name: 'StartAnimation',
  data: () => ({
    fellowAnim: require('../assets/images/fellow-anim.gif'),
    fellowFixed: require('../assets/images/fellow-fixed.jpg'),
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
