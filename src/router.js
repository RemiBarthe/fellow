import { createWebHistory, createRouter } from 'vue-router';
import Dashboard from './containers/Dashboard.vue';
import TicketList from './containers/TicketList.vue';
import TicketDetail from './containers/TicketDetail.vue';
import Statistics from './containers/Statistics.vue';
import Settings from './containers/Settings.vue';
import NotFound from './containers/NotFound.vue';

const routes = [
  {
    path: '/',
    name: 'fellow.',
    component: Dashboard
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/tickets',
    name: 'Mes tickets',
    component: TicketList
  },
  {
    path: '/tickets/:slug',
    name: 'Détail ticket',
    component: TicketDetail
  },
  {
    path: '/statistics',
    name: 'Statistiques',
    component: Statistics
  },
  {
    path: '/settings',
    name: 'Paramètres',
    component: Settings
  },
  {
    path: '/404',
    name: '404',
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

const DEFAULT_TITLE = 'fellow.';
router.beforeEach((to, from, next) => {
  document.title = to.name || DEFAULT_TITLE;
  next();
});

export default router;
