<template>
  <button @click="googleSignIn">
    Sign In with Google
  </button>
  <br />
  <button @click="facebookSignIn">
    Sign In with Facebook
  </button>
</template>

<script>
import { getAuth, signInWithRedirect } from 'firebase/auth';
import { googleAuthProvider, facebookAuthProvider } from '../firebase';

export default {
  name: 'Login',
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
