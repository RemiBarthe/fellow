<template>
  <section class="flex h-screen bg-light-gray">
    <UserInfo class="fixed right-4 md:right-10 top-8" />

    <nav class="h-screen bg-white p-5 flex flex-col items-start">
      <FellowTitle class="mb-15" />

      <div class="grid grid-cols-2 gap-2.5">
        <div
          v-for="(space, key) in spaces"
          :key="key"
          class="p-5 bg-light-gray rounded h-32 w-40 flex items-end cursor-pointer"
        >
          {{ space.title }}
        </div>
      </div>
    </nav>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import UserInfo from '../components/UserInfo.vue';
import FellowTitle from '../components/FellowTitle.vue';

export default {
  name: 'Dashboard',
  components: {
    UserInfo,
    FellowTitle
  },
  data: () => ({}),
  async mounted() {
    this.$store.dispatch('setSpaces', this.connectedUser.uid);
    // const spacesRef = collection(db, 'users', this.connectedUser.uid, 'spaces');
    // await addDoc(spacesRef, {
    //   title: 'RTBF'
    // });
  },
  computed: {
    ...mapState(['connectedUser', 'spaces'])
  }
};
</script>

<style scoped></style>
