<template>
  <div
    class="flex flex-col items-start p-5 rounded"
  >
    <img
      :alt="`${connectedUser.displayName} profile picture`"
      :src="connectedUser.photoUrl"
      class="w-10 h-10 rounded-full cursor-pointer"
      @error="defaultProfilePicture"
      @click="showSettings = !showSettings"
    >

    <Modal
      v-if="showSettings"
      :custom-class="'absolute right-5 top-10'"
      @closeModal="showSettings = false"
    >
      <div class="flex flex-col gap-3 items-center">
        <img
          :alt="`${connectedUser.displayName} profile picture`"
          :src="connectedUser.photoUrl"
          class="w-10 h-10 rounded-full"
          @error="defaultProfilePicture"
        >

        <p class="text-center text-base font-bold leading-3">
          {{ connectedUser.displayName }}
          <br><span class="text-gray text-sm font-normal">{{ connectedUser.email }}</span>
        </p>

        <div class="flex flex-col gap-1">
          <button
            class="flex items-center text-gray hover:text-black"
            @click="$router.push('/tickets'); showSettings = !showSettings"
          >
            <Icon
              icon="fluent:ticket-diagonal-16-filled"
              class="mr-2"
            />
            Mes tickets
          </button>
      
          <button
            class="flex items-center text-gray hover:text-black"
            @click="$router.push('/settings'); showSettings = !showSettings"
          >
            <Icon
              icon="ci:settings-filled"
              class="mr-2"
            />
            Paramètres
          </button>

          <button
            class="flex items-center text-thirdary hover:text-black"
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
    </Modal>
  </div>
</template>

<script>
import { getAuth, signOut } from 'firebase/auth';
import { mapState } from 'vuex';
import { Icon } from '@iconify/vue';
import Modal from "./Modal.vue";

export default {
  name: 'UserInfo',
  components: {
    Icon,
    Modal
  },
  data: () => ({
    showSettings: false
  }),
  computed: {
    ...mapState(['connectedUser', 'unsubscribeSpaces', 'unsubscribeTickets'])
  },
  methods: {
    signOutUser() {
      this.unsubscribeSpaces();
      this.unsubscribeTickets();

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
      event.target.src = require('../assets/images/default-profile-picture.svg');
    }
  }
};
</script>

<style scoped></style>
