<template>
  <section class="flex h-screen bg-light-gray">
    <div class="m-auto flex flex-col bg-white p-5 rounded">
      <FellowTitle class="text-title-lg mb-4 md:mb-5" />

      <Button class="bg-black text-white mb-2 md:mb-2.5" @click="googleSignIn">
        <fontAwesomeIcon :icon="['fab', 'google']" class="mr-2" />Se connecter
        avec Google
      </Button>

      <Button class="bg-primary text-white" @click="facebookSignIn">
        <fontAwesomeIcon :icon="['fab', 'facebook']" class="mr-2" />Se connecter
        avec Facebook
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
