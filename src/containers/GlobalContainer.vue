<template>
  <section class="flex min-h-screen bg-light-gray">
    <UserInfo class="fixed right-5 top-5" />

    <NavBar />

    <Dashboard />
  </section>
</template>

<script>
import UserInfo from '../components/UserInfo.vue';
import NavBar from '../components/NavBar.vue';
import Dashboard from './Dashboard.vue';

export default {
  name: 'GlobalContainer',
  components: {
    UserInfo,
    NavBar,
    Dashboard
  },
  data: () => ({})
};
</script>

<style lang="scss" scoped></style>
