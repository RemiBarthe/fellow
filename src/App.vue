<template>
  <div class="font-text text-base font-normal">
    <StartAnimation v-if="!startAnimationOver" />
    <template v-else>
      <GlobalContainer v-if="connectedUser.uid && selectedSpace.id" />

      <ChooseSpace v-else-if="connectedUser.uid" />

      <Login v-else />
    </template>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { mapActions, mapState } from 'vuex';
import StartAnimation from './containers/StartAnimation.vue';
import Login from './containers/Login.vue';
import GlobalContainer from './containers/GlobalContainer.vue';
import ChooseSpace from './containers/ChooseSpace.vue';
import { setUserDocument } from './utils/firestore';

export default {
  name: 'App',
  components: {
    Login,
    StartAnimation,
    GlobalContainer,
    ChooseSpace
  },
  data: () => ({
    tempUser: {}
  }),
  computed: {
    ...mapState(['connectedUser', 'startAnimationOver', 'selectedSpace'])
  },
  created() {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.tempUser = {
          displayName: user.displayName,
          email: user.email,
          creationTime: user.metadata.creationTime,
          lastSignInTime: user.metadata.lastSignInTime,
          photoUrl: user.photoURL,
          uid: user.uid
        };

        setUserDocument(this.tempUser);
        this.setConnectedUser(this.tempUser);
      } else {
        this.setStateToDefault();
      }
    });
  },
  methods: {
    ...mapActions(['setConnectedUser', 'setStateToDefault'])
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');

body {
  -webkit-tap-highlight-color: transparent;
}
</style>
