<template>
  <section class="flex min-h-screen bg-light-gray bg-blob-global-3">
    <UserInfo class="absolute right-5 top-5" />

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

<style lang="scss" scoped>
.bg-blob-global-1 {
    background-image: 
      url('../assets/images/blobs-global-1/blob-global-1.svg');
    background-repeat: no-repeat;
    background-position: center right;
    background-attachment: fixed;
    background-size: calc(max(35%, 400px));
  }

  .bg-blob-global-2 {
    background-image: 
      url('../assets/images/blobs-global-2/blob-global-left-2.svg'),
      url('../assets/images/blobs-global-2/blob-global-right-2.svg');
    background-repeat: no-repeat, no-repeat;
    background-position: center left 18.5%, bottom right;
    background-attachment: fixed;
    background-size: calc(max(40%, 500px));
  }

  .bg-blob-global-3 {
    background-image: 
      url('../assets/images/blobs-global-3/blob-global-left-3.svg'),
       url('../assets/images/blobs-global-3/blob-global-right-3.svg'),
        url('../assets/images/blobs-global-3/blob-global-top-3.svg');
    background-repeat: no-repeat, no-repeat, no-repeat;
    background-position: bottom left 18.5%, center right, center top;
    background-attachment: fixed;
    background-size: calc(max(30%, 500px));
  }

  </style>
