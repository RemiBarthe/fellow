<template>
  <section class="flex h-screen">
    <div class="m-auto">
      <h1 class="font-black text-title-max font-text flex select-none">
        {{ animatedTitle }}
        <span class="text-primary">.</span>
      </h1>
    </div>
  </section>
</template>

<script>
export default {
  name: 'StartAnimation',
  data: () => ({
    animatedTitle: 'f',
    fellowArray: ['f', 'e', 'l', 'l', 'o', 'w']
  }),
  mounted() {
    this.animateTitle();
  },
  methods: {
    animateTitle() {
      let letterNumber = 1;
      setTimeout(() => {
        let animateTitle = setInterval(() => {
          this.animatedTitle += this.fellowArray[letterNumber];
          letterNumber++;

          if (letterNumber >= this.fellowArray.length)
            clearInterval(animateTitle);
        }, 90);

        setTimeout(() => {
          this.$store.dispatch('setStartAnimationOver', true);
        }, 2000);
      }, 1500);
    }
  }
};
</script>

<style scoped>
.h1 {
  transition-duration: 1s;
}
</style>
