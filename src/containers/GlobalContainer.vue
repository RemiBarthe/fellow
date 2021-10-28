<template>
  <section class="flex h-screen bg-light-gray">
    <UserInfo class="fixed right-5 top-5" />

    <NavBar />
  </section>
</template>

<script>
import UserInfo from '../components/UserInfo.vue';
import NavBar from '../components/NavBar.vue';

export default {
  name: 'GlobalContainer',
  components: {
    UserInfo,
    NavBar
  },
  data: () => ({})
};
</script>

<style lang="scss" scoped></style>
