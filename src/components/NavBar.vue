<template>
  <nav
    class="h-screen bg-white p-5 flex flex-col items-start border-r-2 border-gray"
  >
    <FellowTitle class="mb-15 hidden md:inline" />
    <FellowTitle class="mb-15 inline md:hidden" :short="true" />

    <div class="grid grid-cols-1 mb-12 gap-4 text-gray text-left w-full">
      <button
        v-for="(navItem, key) in navList"
        :key="key"
        class="nav-item hover:text-black flex items-center w-full text-title md:text-base"
        :class="{ selected: navItem.title === selectedNav }"
        @click="selectedNav = navItem.title"
      >
        <Icon :icon="navItem.icon" class="mr-0 md:mr-5" />
        <p class="hidden md:contents">{{ navItem.title }}</p>
      </button>
    </div>

    <div
      class="hidden md:grid grid-cols-2 gap-2.5 text-base text-left select-none"
    >
      <div
        v-for="(space, key) in spaces"
        :key="key"
        class="p-4 bg-light-gray rounded h-32 w-36 flex items-end space cursor-pointer"
        :class="{ selected: space.id === this.selectedSpaceId }"
        @click="selectSpace(space)"
      >
        {{ space.title }}
      </div>

      <div class="font-bold  rounded">
        <p class="cursor-pointer rounded p-2">
          <Icon icon="akar-icons:plus" class="mr-1 text-base-lg float-left " />
          Créer un <br />espace
        </p>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex';
import FellowTitle from './FellowTitle.vue';
import { Icon } from '@iconify/vue';

export default {
  name: 'NavBar',
  components: {
    FellowTitle,
    Icon
  },
  data: () => ({
    navList: [
      { title: 'Dashboard', icon: 'ic:round-dashboard' },
      { title: 'Mes tickets', icon: 'fluent:ticket-diagonal-16-filled' },
      { title: 'Statistiques', icon: 'ion:stats-chart' },
      { title: 'Paramètres', icon: 'ci:settings-filled' }
    ],
    selectedNav: 'Dashboard'
  }),
  computed: {
    ...mapState(['spaces', 'selectedSpaceId'])
  },
  methods: {
    selectSpace(space) {
      space.selected = true;
      this.$store.dispatch('setSelectedSpace', space.id);
    }
  }
};
</script>

<style lang="scss" scoped>
.nav-item {
  &.selected {
    font-weight: 700;
    color: black;
    border-right: 3px solid theme('colors.primary');
    width: 320px;
    margin-right: -22px;

    svg {
      color: theme('colors.primary');
    }

    @media (max-width: 768px) {
      &.selected {
        width: 54px;
      }
    }
  }
}

.space {
  &.selected {
    background-color: theme('colors.primary');
    color: white;
    font-weight: 700;
  }
}
</style>
