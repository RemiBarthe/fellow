<template>
  <section class="flex h-screen bg-light-gray">
    <UserInfo class="fixed right-4 md:right-10 top-8" />
  </section>
</template>

<script>
import UserInfo from '../components/UserInfo.vue';

export default {
  name: 'Dashboard',
  components: {
    UserInfo
  },
  data: () => ({}),
  methods: {}
};
</script>

<style scoped></style>
