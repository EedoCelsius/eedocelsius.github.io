export const componentRoutes = [
  {
    path: '/playground/deeplink-experience',
    name: 'DeepLinkExperiencePlayground',
    component: () => import('../views/playgrounds/DeepLinkExperienceView.vue'),
    meta: {
      titleKey: 'routes.deeplinkExperience.title',
      breadcrumbKey: 'components.deeplink.name'
    }
  }
];
