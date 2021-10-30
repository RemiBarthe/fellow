<template>
  <section class="flex min-h-screen bg-light-gray">
    <UserInfo class="fixed right-5 top-5" />

    <NavBar />

    <div class="p-5 pt-20 w-full">
      <router-view />
    </div>
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
