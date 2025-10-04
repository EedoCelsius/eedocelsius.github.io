import QRCodeCard from '@/components/library/QRCodeCard.vue';
import BlurOverlay from '@/components/library/BlurOverlay.vue';
import LoadingOverlay from '@/components/library/LoadingOverlay.vue';
import AppLink from '@/components/library/AppLink.vue';

export type ControlType = 'text' | 'color' | 'boolean' | 'textarea' | 'select';

export interface ControlDefinition {
  key: string;
  labelKey: string;
  type: ControlType;
  options?: Array<{ label: string; value: string }>;
}

export interface ComponentDefinition {
  id: string;
  nameKey: string;
  descriptionKey: string;
  component: any;
  initialProps: Record<string, unknown>;
  controls: ControlDefinition[];
  previewSlot?: string;
}

export const componentRegistry: ComponentDefinition[] = [
  {
    id: 'qr-code-card',
    nameKey: 'componentsList.qrCodeCard.name',
    descriptionKey: 'componentsList.qrCodeCard.description',
    component: QRCodeCard,
    initialProps: {
      content: 'https://component-lab.dev',
      lightColor: '#FFFFFF',
      darkColor: '#233047',
      icon: '/icons/lab-flask.svg'
    },
    controls: [
      { key: 'content', labelKey: 'controls.content', type: 'textarea' },
      { key: 'lightColor', labelKey: 'controls.lightColor', type: 'color' },
      { key: 'darkColor', labelKey: 'controls.darkColor', type: 'color' },
      { key: 'icon', labelKey: 'controls.icon', type: 'text' }
    ],
    previewSlot: 'qr'
  },
  {
    id: 'blur-overlay',
    nameKey: 'componentsList.blurOverlay.name',
    descriptionKey: 'componentsList.blurOverlay.description',
    component: BlurOverlay,
    initialProps: {
      visible: true,
      overlayColor: 'rgba(16, 21, 34, 0.35)',
      blurAmount: '12px',
      rounded: true
    },
    controls: [
      { key: 'overlayColor', labelKey: 'controls.overlay', type: 'text' },
      { key: 'blurAmount', labelKey: 'controls.blurAmount', type: 'text' },
      { key: 'rounded', labelKey: 'controls.rounded', type: 'boolean' }
    ],
    previewSlot: 'overlay'
  },
  {
    id: 'loading-overlay',
    nameKey: 'componentsList.loadingOverlay.name',
    descriptionKey: 'componentsList.loadingOverlay.description',
    component: LoadingOverlay,
    initialProps: {
      visible: true,
      description: 'Preparing your calm experience...',
      overlayColor: 'rgba(16, 21, 34, 0.4)',
      blurAmount: '14px'
    },
    controls: [
      { key: 'description', labelKey: 'controls.description', type: 'textarea' },
      { key: 'overlayColor', labelKey: 'controls.overlay', type: 'text' },
      { key: 'blurAmount', labelKey: 'controls.blurAmount', type: 'text' }
    ],
    previewSlot: 'loading'
  },
  {
    id: 'app-link',
    nameKey: 'componentsList.appLink.name',
    descriptionKey: 'componentsList.appLink.description',
    component: AppLink,
    initialProps: {
      href: 'https://component-lab.dev',
      label: 'Explore Component Lab',
      openInNewTab: true,
      tone: 'primary'
    },
    controls: [
      { key: 'label', labelKey: 'controls.label', type: 'text' },
      { key: 'href', labelKey: 'controls.href', type: 'text' },
      {
        key: 'tone',
        labelKey: 'controls.tone',
        type: 'select',
        options: [
          { label: 'Primary', value: 'primary' },
          { label: 'Subtle', value: 'subtle' }
        ]
      },
      { key: 'openInNewTab', labelKey: 'controls.target', type: 'boolean' }
    ]
  }
];

export const componentMap = Object.fromEntries(
  componentRegistry.map((definition) => [definition.id, definition])
) as Record<string, ComponentDefinition>;
