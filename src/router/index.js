import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LabView from '../views/LabView.vue';
import { labComponents } from '../lab/registry';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/lab/:componentId?',
    name: 'lab',
    component: LabView,
    props: route => ({ componentId: route.params.componentId })
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: () => ({ name: 'lab', params: { componentId: labComponents[0]?.id } })
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.name === 'lab' && !to.params.componentId) {
    next({ name: 'lab', params: { componentId: labComponents[0]?.id } });
  } else {
    next();
  }
});

export default router;
