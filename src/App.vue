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
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { mapActions, mapState } from 'vuex';
import StartAnimation from './containers/StartAnimation.vue';
import Login from './containers/Login.vue';
import { db } from './firebase';

export default {
  name: 'App',
  components: {
    Login,
    StartAnimation
  },
  data: () => ({
    auth: '',
    tempUser: {}
  }),
  computed: {
    ...mapState(['connectedUser', 'startAnimationOver'])
  },
  created() {
    this.auth = getAuth();

    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.tempUser = {
          displayName: user.displayName,
          email: user.email,
          creationTime: user.metadata.creationTime,
          lastSignInTime: user.metadata.lastSignInTime,
          photoUrl: user.photoURL,
          uid: user.uid
        };

        const userDb = doc(db, 'users', user.uid);
        setDoc(userDb, this.tempUser, { merge: true });

        this.setConnectedUser(this.tempUser);
      } else {
        this.setConnectedUser({
          displayName: '',
          email: '',
          creationTime: '',
          lastSignInTime: '',
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
