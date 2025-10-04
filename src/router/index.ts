import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/components',
      redirect: '/components/deeplink-experience'
    },
    {
      path: '/components/:id',
      name: 'component-playground',
      component: () => import('../views/ComponentPlayground.vue'),
      props: true
    }
  ],
  scrollBehavior() {
    return { top: 0 };
  }
});

export default router;
