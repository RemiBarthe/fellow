<template>
  <section class="flex h-screen bg-light-gray">
    <div class="m-auto flex flex-col bg-white p-5 rounded">
      <FellowTitle class="mb-5" />

      <Button
        class="bg-black text-white mb-2.5 hover:bg-opacity-85"
        @click="googleSignIn"
        icon="fa-brands:google"
      >
        Se connecter avec Google
      </Button>

      <Button
        class="bg-primary text-white hover:bg-opacity-90"
        @click="facebookSignIn"
        icon="fa-brands:facebook"
      >
        Se connecter avec Facebook
      </Button>
    </div>
  </section>
</template>

<script>
import { getAuth, signInWithRedirect } from 'firebase/auth';
import { googleAuthProvider, facebookAuthProvider } from '../firebase';
import Button from '../components/Button.vue';
import FellowTitle from '../components/FellowTitle.vue';

export default {
  name: 'Login',
  components: {
    Button,
    FellowTitle
  },
  data: () => ({
    token: '',
    user: '',
    errorCode: '',
    errorMessage: '',
    credential: ''
  }),
  methods: {
    googleSignIn() {
      const auth = getAuth();
      signInWithRedirect(auth, googleAuthProvider);
    },
    facebookSignIn() {
      const auth = getAuth();
      signInWithRedirect(auth, facebookAuthProvider);
    }
  }
};
</script>

<style scoped></style>
