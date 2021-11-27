<template>
  <h2 class="font-bold text-title mb-5">
    Paramètres
  </h2>

  <h3 class="text-base font-bold">
    Gestion des espaces
  </h3>

  <div class="flex flex-col gap-1 mb-5">
    <div
      v-for="space in spaces"
      :key="space.id"
      class="flex justify-between items-center hover:text-primary"
    >
      <p>{{ space.title }}</p>

      <div>
        <Icon
          icon="akar-icons:edit"
          class="mr-1 text-base-lg float-left cursor-pointer"
        />

        <Icon
          icon="fluent:delete-16-regular"
          class="text-base-lg float-left cursor-pointer hover:text-thirdary"
        />
      </div>
    </div>
  </div>

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

  <button
    class="flex items-center text-thirdary hover:text-black"
    @click="signOutUser"
  >
    <Icon
      icon="fluent:delete-16-regular"
      class="mr-2 text-base-lg"
    />
    Supprimer mon compte
  </button>
</template>

<script>
import { mapState } from "vuex";
import { Icon } from '@iconify/vue';
import { getAuth, signOut } from 'firebase/auth';

export default {
  name: 'Settings',
  components: {
    Icon
  },
  data: () => ({}),
  computed: {
    ...mapState(['spaces', 'connectedUser', 'unsubscribeTickets', 'unsubscribeSpaces'])
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
  }
};
</script>

<style lang="scss" scoped></style>
