<template>
  <nav
    class="min-h-screen bg-white p-5 flex flex-col flex-shrink-0 items-start border-r-2 border-gray"
  >
    <FellowTitle class="mb-15 hidden md:inline" />
    <FellowTitle class="mb-15 inline md:hidden" :short="true" />

    <div class="grid grid-cols-1 mb-12 gap-4 text-gray text-left w-full">
      <button
        v-for="(navItem, key) in navList"
        :key="key"
        class="nav-item hover:text-black flex items-center w-full text-title md:text-base"
        :class="{ selected: navItem.path === $route.path }"
        @click="$router.push(navItem.path)"
      >
        <Icon :icon="navItem.icon" class="mr-0 md:mr-5" />
        <p class="hidden md:contents">{{ navItem.title }}</p>
      </button>
    </div>

    <SpaceList class="hidden md:grid mb-10" />

    <div
      class="text-title rounded block md:hidden"
      @click="showSpacesModal = true"
    >
      <Icon icon="heroicons-outline:switch-horizontal" />
    </div>

    <Modal v-if="showSpacesModal" @closeModal="showSpacesModal = false">
      <h2 class="text-title font-bold mb-5">Mes espaces</h2>
      <SpaceList />
    </Modal>
  </nav>
</template>

<script>
import FellowTitle from './FellowTitle.vue';
import SpaceList from './SpaceList.vue';
import Modal from './Modal.vue';
import { Icon } from '@iconify/vue';

export default {
  name: 'NavBar',
  components: {
    FellowTitle,
    SpaceList,
    Modal,
    Icon
  },
  data: () => ({
    navList: [
      { title: 'Dashboard', icon: 'ic:round-dashboard', path: '/dashboard' },
      {
        title: 'Mes tickets',
        icon: 'fluent:ticket-diagonal-16-filled',
        path: '/tickets'
      },
      { title: 'Statistiques', icon: 'ion:stats-chart', path: '/statistics' },
      { title: 'Paramètres', icon: 'ci:settings-filled', path: '/settings' }
    ],
    selectedNav: 'Dashboard',
    showSpacesModal: false
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
