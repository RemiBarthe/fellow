<template>
  <section class="p-5 flex h-screen">
    <FellowTitle class="mb-15 md:inline absolute" />

    <div class="m-auto">
      <SpaceList />
    </div>
  </section>
</template>

<script>
import FellowTitle from '../components/FellowTitle.vue';
import SpaceList from '../components/SpaceList.vue';

export default {
  name: 'ChooseSpace',
  components: {
    FellowTitle,
    SpaceList
  }
};
</script>

<style lang="scss" scoped></style>
