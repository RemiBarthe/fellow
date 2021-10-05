<template>
  <div class="border-2 border-gray-700">hello {{ user.displayName }}</div>
  <button @click="googleSignIn">
    Sign In with Google
  </button>
</template>

<script>
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
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
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          this.credential = GoogleAuthProvider.credentialFromResult(result);
          this.token = this.credential.accessToken;
          // The signed-in user info.
          this.user = result.user;
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          this.errorCode = error.code;
          this.errorMessage = error.message;
          // The AuthCredential type that was used.
          this.credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
    }
  }
};
</script>

<style scoped></style>
