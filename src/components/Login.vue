<template>
  <button @click="googleSignIn">
    Sign In with Google
  </button>
</template>

<script>
import { getAuth, signInWithRedirect } from 'firebase/auth';
import { provider } from '../firebase';

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
      signInWithRedirect(auth, provider);
    }
  }
};
</script>

<style scoped></style>
