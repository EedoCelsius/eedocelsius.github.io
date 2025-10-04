import BlurOverlay from './BlurOverlay.vue';
import LoadingOverlay from './LoadingOverlay.vue';
import QrCodeCard from './QrCodeCard.vue';
import type { LibraryComponent } from './types';

export const libraryComponents: LibraryComponent[] = [
  {
    id: 'qr-code-card',
    translationKey: 'library.qrCodeCard',
    component: QrCodeCard,
    defaultProps: {
      content: 'https://component-lab.dev',
      lightColor: '#ffffff',
      darkColor: '#2f40ac',
      icon: '/component-lab-icon.svg'
    },
    controls: [
      { key: 'content', type: 'text', labelKey: 'component.props.content', placeholder: 'https://component-lab.dev' },
      { key: 'lightColor', type: 'color', labelKey: 'component.props.lightColor' },
      { key: 'darkColor', type: 'color', labelKey: 'component.props.darkColor' },
      { key: 'icon', type: 'text', labelKey: 'component.props.icon', placeholder: '/component-lab-icon.svg' }
    ]
  },
  {
    id: 'blur-overlay',
    translationKey: 'library.blurOverlay',
    component: BlurOverlay,
    defaultProps: {
      blurLevel: 12,
      active: true
    },
    controls: [
      { key: 'blurLevel', type: 'number', labelKey: 'component.props.blurLevel', min: 0, max: 24, step: 1 }
    ]
  },
  {
    id: 'loading-overlay',
    translationKey: 'library.loadingOverlay',
    component: LoadingOverlay,
    defaultProps: {
      description: 'Fetching fresh data for you…',
      blurLevel: 12,
      active: true
    },
    controls: [
      { key: 'description', type: 'textarea', labelKey: 'component.props.description', placeholder: 'Fetching fresh data for you…' },
      { key: 'blurLevel', type: 'number', labelKey: 'component.props.blurLevel', min: 4, max: 24, step: 1 }
    ]
  }
];

export function getComponentById(id: string) {
  return libraryComponents.find((entry) => entry.id === id);
}
