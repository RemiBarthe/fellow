<template>
  <div class="grid grid-cols-2 gap-2.5 text-base text-left select-none">
    <div
      v-for="(space, key) in spaces"
      :key="key"
      class="p-4 bg-light-gray rounded h-32 w-36 flex items-end space cursor-pointer"
      :class="{ selected: space.id === selectedSpace.id }"
      @click="selectSpace(space)"
    >
      {{ space.title }}
    </div>

    <div
      v-if="showInputNewSpace"
      class="bg-light-gray rounded h-32 w-36 cursor-pointer"
    >
      <textarea
        ref="inputNewSpace"
        v-model="newSpaceTitle"
        class="resize-none relative top-0 bottom-0 w-full h-full rounded bg-light-gray p-4 focus:bg-white"
        @keyup.enter.prevent="saveNewSpace()"
        @keyup.esc="closeNewSpace()"
      />
      <p
        class="flex relative justify-end right-4 font-bold text-sm"
        @click="saveNewSpace()"
      >
        <Icon
          icon="fluent:arrow-enter-left-24-filled"
          class="mr-1 mt-1"
        />
        Valider
      </p>

      <p
        class="flex relative justify-end right-4 text-sm"
        @click="closeNewSpace()"
      >
        <Icon
          icon="mdi:keyboard-esc"
          class="mr-1 mt-1"
        />
        Annuler
      </p>
    </div>

    <div
      v-else
      class="font-bold"
    >
      <p
        class="cursor-pointer rounded p-2"
        @click="createNewSpace()"
      >
        <Icon
          icon="akar-icons:plus"
          class="mr-1 text-base-lg float-left mt-0.5"
        />
        Créer un <br>espace
      </p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { Icon } from '@iconify/vue';
import { addSpaceDocument } from '../utils/firestore';

export default {
  name: 'SpaceList',
  components: {
    Icon
  },
  data: () => ({
    showInputNewSpace: false,
    newSpaceTitle: ''
  }),
  computed: {
    ...mapState(['spaces', 'selectedSpace', 'connectedUser', 'unsubscribeTickets'])
  },
  mounted() {
    this.fetchSpaces(this.connectedUser.uid);
  },
  methods: {
    ...mapActions(['fetchSpaces', 'setSelectedSpace', 'fetchTickets']),
    selectSpace(space) {
      if(this.unsubscribeTickets){
        this.unsubscribeTickets();
      }
      this.setSelectedSpace(space);
      this.fetchTickets({ userId: this.connectedUser.uid, spaceId: space.id });
    },
    createNewSpace() {
      this.showInputNewSpace = true;

      setTimeout(() => {
        this.$refs.inputNewSpace.focus();
      }, 50);
    },
    async saveNewSpace() {
      const spaceTitle = this.newSpaceTitle.trim();
      this.closeNewSpace();

      addSpaceDocument(this.connectedUser.uid, spaceTitle);
    },
    closeNewSpace() {
      this.showInputNewSpace = false;
      this.newSpaceTitle = '';
    }
  }
};
</script>

<style lang="scss" scoped>
.space {
  &.selected {
    background-color: theme('colors.primary');
    color: white;
    font-weight: 700;
  }
}
</style>
