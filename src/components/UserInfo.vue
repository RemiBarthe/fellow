<template>
  <div class="flex flex-col items-start hover:bg-white p-5 rounded">
    <div class="flex items-center">
      <p class="mr-2.5">{{ connectedUser.displayName }}</p>
      <img
        :alt="`${connectedUser.displayName} profile picture`"
        @error="defaultProfilePicture"
        :src="connectedUser.photoUrl"
        class="w-10 h-10 rounded-full"
      />
    </div>

    <button @click="signOutUser" class="mt-4">
      <FontAwesomeIcon :icon="['fas', 'sign-out-alt']" class="mr-2" />
      Paramètres
    </button>

    <button @click="signOutUser" class="mt-4">
      <FontAwesomeIcon :icon="['fas', 'sign-out-alt']" class="mr-2" />
      Se déconnecter
    </button>
  </div>
</template>

<script>
import { getAuth, signOut } from 'firebase/auth';
import { mapState } from 'vuex';

export default {
  name: 'UserInfo',
  computed: {
    ...mapState(['connectedUser'])
  },
  methods: {
    signOutUser() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          // Sign-out successful.
        })
        .catch((error) => {
          console.log(error);
        });
    },
    defaultProfilePicture(event) {
      event.target.src = '../assets/images/default-profile-picture.png';
    }
  }
};
</script>

<style scoped></style>
