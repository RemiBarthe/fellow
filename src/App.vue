<template>
  <StartAnimation v-if="!startAnimationOver" />
  <template v-else>
    <Login v-if="!connectedUser.uid" />
    <button v-else @click="signOutUser">
      Sign Out {{ connectedUser.displayName }}
    </button>
  </template>
</template>

<script>
import Login from './components/Login.vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { mapActions, mapState } from 'vuex';
import StartAnimation from './containers/StartAnimation.vue';

export default {
  name: 'App',
  components: {
    Login,
    StartAnimation
  },
  data: () => ({
    auth: ''
  }),
  computed: {
    ...mapState(['connectedUser', 'startAnimationOver'])
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
