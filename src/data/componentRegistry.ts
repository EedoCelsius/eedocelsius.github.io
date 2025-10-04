import type { Component } from 'vue';

import { BlurOverlay, LabLink, LoadingOverlay, QrCodeCard } from '@/components';

export type ControlType = 'text' | 'color' | 'boolean' | 'textarea';

export interface ComponentControl {
  key: string;
  labelKey: string;
  type: ControlType;
  defaultValue: unknown;
}

export interface ComponentDefinition {
  id: string;
  nameKey: string;
  descriptionKey: string;
  component: Component;
  controls: ComponentControl[];
  initialProps: Record<string, unknown>;
  previewClass?: string;
}

export const componentDefinitions: ComponentDefinition[] = [
  {
    id: 'qr-code-card',
    nameKey: 'components.qrCodeCard.name',
    descriptionKey: 'components.qrCodeCard.description',
    component: QrCodeCard,
    initialProps: {
      content: 'https://component-lab.dev',
      lightColor: '#f0f4ff',
      darkColor: '#1c2560',
      icon: 'https://api.iconify.design/mdi:test-tube.svg?color=%235c7cfa'
    },
    controls: [
      {
        key: 'content',
        labelKey: 'components.qrCodeCard.content',
        type: 'text',
        defaultValue: 'https://component-lab.dev'
      },
      {
        key: 'lightColor',
        labelKey: 'components.qrCodeCard.lightColor',
        type: 'color',
        defaultValue: '#f0f4ff'
      },
      {
        key: 'darkColor',
        labelKey: 'components.qrCodeCard.darkColor',
        type: 'color',
        defaultValue: '#1c2560'
      },
      {
        key: 'icon',
        labelKey: 'components.qrCodeCard.icon',
        type: 'text',
        defaultValue: 'https://api.iconify.design/mdi:test-tube.svg?color=%235c7cfa'
      }
    ],
    previewClass: 'preview-stack'
  },
  {
    id: 'blur-overlay',
    nameKey: 'components.blurOverlay.name',
    descriptionKey: 'components.blurOverlay.description',
    component: BlurOverlay,
    initialProps: {
      active: true,
      blurStrength: '18px'
    },
    controls: [
      {
        key: 'active',
        labelKey: 'components.blurOverlay.active',
        type: 'boolean',
        defaultValue: true
      },
      {
        key: 'blurStrength',
        labelKey: 'components.blurOverlay.blurStrength',
        type: 'text',
        defaultValue: '18px'
      }
    ],
    previewClass: 'preview-overlay'
  },
  {
    id: 'loading-overlay',
    nameKey: 'components.loadingOverlay.name',
    descriptionKey: 'components.loadingOverlay.description',
    component: LoadingOverlay,
    initialProps: {
      active: true,
      description: 'Syncing your workspace…'
    },
    controls: [
      {
        key: 'active',
        labelKey: 'components.loadingOverlay.active',
        type: 'boolean',
        defaultValue: true
      },
      {
        key: 'description',
        labelKey: 'components.loadingOverlay.descriptionLabel',
        type: 'textarea',
        defaultValue: 'Syncing your workspace…'
      }
    ],
    previewClass: 'preview-overlay'
  },
  {
    id: 'lab-link',
    nameKey: 'components.labLink.name',
    descriptionKey: 'components.labLink.description',
    component: LabLink,
    initialProps: {
      label: 'Open documentation',
      href: 'https://primevue.org/',
      openInNewTab: true,
      icon: 'pi-compass'
    },
    controls: [
      {
        key: 'label',
        labelKey: 'components.labLink.label',
        type: 'text',
        defaultValue: 'Open documentation'
      },
      {
        key: 'href',
        labelKey: 'components.labLink.href',
        type: 'text',
        defaultValue: 'https://primevue.org/'
      },
      {
        key: 'openInNewTab',
        labelKey: 'components.labLink.target',
        type: 'boolean',
        defaultValue: true
      },
      {
        key: 'icon',
        labelKey: 'components.labLink.icon',
        type: 'text',
        defaultValue: 'pi-compass'
      }
    ],
    previewClass: 'preview-inline'
  }
];

export const componentLookup = Object.fromEntries(
  componentDefinitions.map((definition) => [definition.id, definition])
) as Record<string, ComponentDefinition>;
