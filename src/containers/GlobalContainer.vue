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
import { mapActions, mapState } from "vuex";

export default {
  name: 'GlobalContainer',
  components: {
    UserInfo,
    NavBar
  },
  data: () => ({}),
  computed: {
    ...mapState(['connectedUser', 'selectedSpace'])
  },
  mounted() {
    this.fetchTickets({ userId: this.connectedUser.uid, spaceId: this.selectedSpace.id });
  },
  methods: {
    ...mapActions(['fetchTickets']),
  }
};
</script>

<style lang="scss" scoped></style>
