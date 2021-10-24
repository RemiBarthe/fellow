<template>
  <section class="flex h-screen bg-light-gray">
    <UserInfo class="fixed right-5 top-5" />

    <NavBar />
  </section>
</template>

<script>
import { mapState } from 'vuex';
import UserInfo from '../components/UserInfo.vue';
import NavBar from '../components/NavBar.vue';

export default {
  name: 'Dashboard',
  components: {
    UserInfo,
    NavBar
  },
  data: () => ({}),
  mounted() {
    this.$store.dispatch('setSpaces', this.connectedUser.uid);
    // const spacesRef = collection(db, 'users', this.connectedUser.uid, 'spaces');
    // await addDoc(spacesRef, {
    //   title: 'RTBF'
    // });
  },
  computed: {
    ...mapState(['connectedUser'])
  }
};
</script>

<style lang="scss" scoped></style>
