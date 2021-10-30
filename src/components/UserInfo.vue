<template>
  <div
    class="flex flex-col items-start p-5 rounded hover:bg-white cursor-pointer"
    :class="{ 'bg-white': showSettings }"
    @click.self="showSettings = !showSettings"
  >
    <div
      class="flex items-center"
      @click="showSettings = !showSettings"
    >
      <p class="mr-2.5 hidden md:inline">
        {{ connectedUser.displayName }}
      </p>
      <img
        :alt="`${connectedUser.displayName} profile picture`"
        :src="connectedUser.photoUrl"
        class="w-10 h-10 rounded-full"
        @error="defaultProfilePicture"
      >
    </div>

    <div v-if="showSettings">
      <button class="mt-4 flex items-center text-gray hover:text-black">
        <Icon
          icon="ci:settings-filled"
          class="mr-2"
        />
        Paramètres
      </button>

      <button
        class="mt-2 flex items-center text-gray hover:text-black"
        @click="signOutUser"
      >
        <Icon
          icon="fa-solid:sign-out-alt"
          class="mr-2"
        />
        Se déconnecter
      </button>
    </div>
  </div>
</template>

<script>
import { getAuth, signOut } from 'firebase/auth';
import { mapState } from 'vuex';
import { Icon } from '@iconify/vue';

export default {
  name: 'UserInfo',
  components: {
    Icon
  },
  data: () => ({
    showSettings: false
  }),
  computed: {
    ...mapState(['connectedUser', 'unsubscribeUserSpaces'])
  },
  methods: {
    signOutUser() {
      this.unsubscribeUserSpaces();

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
      event.target.src = require('../assets/images/default-profile-picture.png');
    }
  }
};
</script>

<style scoped></style>
