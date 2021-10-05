<template>
  <div class="border-2 border-gray-700">
    hello {{ user.displayName }}
    <p>{{ errorMessage }}</p>
  </div>
  <button @click="googleSignIn">
    Sign In with Google
  </button>
</template>

<script>
import {
  getAuth,
  getRedirectResult,
  signInWithRedirect,
  GoogleAuthProvider
} from 'firebase/auth';
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
  created() {
    const auth = getAuth();
    getRedirectResult(auth)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        this.token = credential.accessToken;

        // The signed-in user info.
        this.user = result.user;
      })
      .catch((error) => {
        // Handle Errors here.
        this.errorCode = error.code;
        this.errorMessage = error.message;
        // The AuthCredential type that was used.
        this.credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  },
  methods: {
    googleSignIn() {
      const auth = getAuth();
      signInWithRedirect(auth, provider);
    }
  }
};
</script>

<style scoped></style>
