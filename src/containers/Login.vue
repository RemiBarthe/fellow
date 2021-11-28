<template>
  <section class="flex h-screen bg-light-gray bg-blob-login">
    <div class="m-auto flex flex-col bg-white p-5 rounded">
      <FellowTitle class="mb-5" />

      <Button
        class="bg-black text-white mb-2.5 hover:bg-opacity-85"
        icon="fa-brands:google"
        @click="googleSignIn"
      >
        Se connecter avec Google
      </Button>

      <Button
        class="bg-primary text-white hover:bg-opacity-90"
        icon="fa-brands:facebook"
        @click="facebookSignIn"
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

<style scoped>
.bg-blob-login {
    background-image: 
      url('../assets/images/blobs-login/blob-login-turquoise.svg'),
      url('../assets/images/blobs-login/blob-login-blue.svg'),
      url('../assets/images/blobs-login/blob-login-red.svg');
    background-repeat: no-repeat, no-repeat, no-repeat;
    background-position: bottom left, top left, top right -20%;
    background-size: calc(max(42%, 500px));
   
  }
</style>
