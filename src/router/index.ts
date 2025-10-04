import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import ComponentGalleryPage from '@/pages/ComponentGalleryPage.vue'
import ComponentDetailPage from '@/pages/ComponentDetailPage.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/components',
      name: 'components',
      component: ComponentGalleryPage,
    },
    {
      path: '/components/:slug',
      name: 'component-detail',
      component: ComponentDetailPage,
      props: true,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundPage,
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
