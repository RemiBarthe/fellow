<template>
  <h2 class="font-bold text-title mb-5">
    Paramètres
  </h2>

  <div class="bg-white p-5 rounded">
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
            @click="showModalScope(EDIT_SPACE, space)"
          />

          <Icon
            icon="fluent:delete-16-regular"
            class="text-base-lg float-left cursor-pointer hover:text-thirdary"
            @click="showModalScope(DELETE_SPACE, space)"
          />
        </div>
      </div>
    </div>

    <h3 class="text-base font-bold">
      Gestion du compte
    </h3>

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
      @click="showModalScope(DELETE_ACCOUNT)"
    >
      <Icon
        icon="fluent:delete-16-regular"
        class="mr-2 text-base-lg"
      />
      Supprimer mon compte
    </button>
  </div>

  <Modal
    v-if="showModal"
    @closeModal="showModal = false"
  >
    <template v-if="modalScope === EDIT_SPACE">
      <h2 class="text-title font-bold mb-5">
        Modification de l'espace
      </h2>

      <input
        v-model="selectedSpace.title"
        placeholder="Titre de l'espace"
        type="text"
        class="text-base w-full border-2 border-primary rounded-xl px-2.5 py-1 mb-5"
        @keyup.enter.prevent="editSlug()"
        @keyup.esc="closeEditSlugModal()"
      >

      <div class="flex justify-end gap-1">
        <Button
          class="bg-black bg-opacity-0 hover:bg-opacity-20 transition-colors duration-200"
          @click="showModal=false"
        >
          Annuler
        </Button>

        <Button
          class="bg-primary text-white hover:bg-opacity-90 transition-colors duration-200"
          @click="editSpace()"
        >
          Valider la modification
        </Button>
      </div>
    </template>

    <template v-if="modalScope === DELETE_SPACE">
      <h2 class="text-title font-bold mb-5">
        Suppression de l'espace
      </h2>

      <p class="mb-5">
        <span class="font-bold text-thirdary">Attention : </span> cette action est irréversible.
        <br> Êtes-vous sur de vouloir <span class="font-bold">supprimer</span> votre espace <span class="font-bold">{{ selectedSpace.title }}</span> définitivement ?
      </p>

      <div class="flex justify-end gap-1">
        <Button
          class="bg-black bg-opacity-0 hover:bg-opacity-20 transition-colors duration-200"
          @click="showModal=false"
        >
          Annuler
        </Button>

        <Button
          class="bg-thirdary text-white hover:bg-opacity-90 transition-colors duration-200"
          @click="deleteSpace()"
        >
          Supprimer définitivement
        </Button>
      </div>
    </template>

    <template v-if="modalScope === DELETE_ACCOUNT">
      <h2 class="text-title font-bold mb-5">
        Suppression du compte
      </h2>

      <p class="mb-5">
        <span class="font-bold text-thirdary">Attention : </span> cette action est irréversible.
        <br> Êtes-vous sur de vouloir <span class="font-bold">supprimer</span> votre compte <span class="font-bold">définitivement</span> ?
      </p>

      <div class="flex justify-end gap-1">
        <Button
          class="bg-black bg-opacity-0 hover:bg-opacity-20 transition-colors duration-200"
          @click="showModal=false"
        >
          Annuler
        </Button>

        <Button
          class="bg-thirdary text-white hover:bg-opacity-90 transition-colors duration-200"
          @click="deleteUserAccount()"
        >
          Supprimer mon compte définitivement
        </Button>
      </div>
    </template>
  </Modal>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { Icon } from '@iconify/vue';
import { getAuth, signOut } from 'firebase/auth';
import Modal from '../components/Modal.vue';
import Button from '../components/Button.vue';
import { deleteSpaceDocument, setSpaceDocument, deleteUserDocument } from '../utils/firestore';

export default {
  name: 'Settings',
  components: {
    Icon,
    Modal,
    Button
  },
  data: () => ({
    showModal: false,
    modalScope: '',
    EDIT_SPACE: 'editSpace',
    DELETE_SPACE: 'deleteSpace',
    DELETE_ACCOUNT: 'deleteAccount',
    selectedSpace: ''
  }),
  computed: {
    ...mapState(['spaces', 'connectedUser', 'unsubscribeTickets', 'unsubscribeSpaces'])
  },
  methods: {
    ...mapActions(['setStateToDefault']),
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
    showModalScope(scope, space = null) {
      this.showModal = true;
      this.modalScope = scope;

      this.selectedSpace = space ? Object.assign({}, space) : '';
    },
    deleteSpace() {
      deleteSpaceDocument(this.connectedUser.uid, this.selectedSpace);
      this.showModal = false;
    },
    editSpace() {
      setSpaceDocument(this.connectedUser.uid, this.selectedSpace);
      this.showModal = false;
    },
    deleteUserAccount() {
      deleteUserDocument(this.connectedUser);
      this.setStateToDefault();
    }
  }
};
</script>

<style lang="scss" scoped></style>
