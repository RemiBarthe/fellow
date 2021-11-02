import { createWebHistory, createRouter } from 'vue-router';
import Dashboard from './containers/Dashboard.vue';
import TicketList from './containers/TicketList.vue';
import TicketDetail from './containers/TicketDetail.vue';
import Statistics from './containers/Statistics.vue';
import Settings from './containers/Settings.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Dashboard
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/tickets',
    name: 'Tickets',
    component: TicketList
  },
  {
    path: '/tickets/:slug',
    name: 'Ticket Detail',
    component: TicketDetail
  },
  {
    path: '/statistics',
    name: 'Statistics',
    component: Statistics
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
