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

    <SpaceList />
  </nav>
</template>

<script>
import FellowTitle from './FellowTitle.vue';
import SpaceList from './SpaceList.vue';
import { Icon } from '@iconify/vue';

export default {
  name: 'NavBar',
  components: {
    FellowTitle,
    SpaceList,
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
  })
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
</style>
