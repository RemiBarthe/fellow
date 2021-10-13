<template>
  hello {{ connectedUser?.displayName }} <br />
  <Login v-if="!connectedUser.uid" />
  <button v-else @click="signOutUser">
    Sign Out
  </button>
</template>

<script>
import Login from './components/Login.vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'App',
  components: {
    Login
  },
  data: () => ({
    auth: ''
  }),
  computed: {
    ...mapState(['connectedUser'])
  },
  created() {
    this.auth = getAuth();

    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.setConnectedUser(user);
      } else {
        this.setConnectedUser({
          displayName: '',
          email: '',
          metadata: {},
          photoUrl: '',
          uid: ''
        });
      }
    });
  },
  methods: {
    ...mapActions(['setConnectedUser']),
    signOutUser() {
      signOut(this.auth)
        .then(() => {
          // Sign-out successful.
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
};
</script>

<style></style>
