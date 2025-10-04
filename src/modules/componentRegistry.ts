import type { Component } from 'vue';
import QrCodeCard from '@/components/QrCodeCard.vue';
import BlurOverlay from '@/components/BlurOverlay.vue';
import LoadingOverlay from '@/components/LoadingOverlay.vue';

export type ControlType = 'text' | 'textarea' | 'color' | 'number';

export interface ComponentControl {
  prop: string;
  type: ControlType;
  labelKey: string;
  helperText?: string;
  min?: number;
  max?: number;
  step?: number;
}

export interface ComponentDefinition {
  id: string;
  nameKey: string;
  descriptionKey: string;
  component: Component;
  defaultProps: Record<string, unknown>;
  controls: ComponentControl[];
}

export const componentRegistry: ComponentDefinition[] = [
  {
    id: 'qr-code-card',
    nameKey: 'component.qrCodeCard.name',
    descriptionKey: 'component.qrCodeCard.description',
    component: QrCodeCard,
    defaultProps: {
      content: 'https://component-lab.dev',
      lightColor: '#f8fafc',
      darkColor: '#0f172a',
      icon: 'pi-link',
    },
    controls: [
      { prop: 'content', type: 'textarea', labelKey: 'controls.content' },
      { prop: 'lightColor', type: 'color', labelKey: 'controls.lightColor' },
      { prop: 'darkColor', type: 'color', labelKey: 'controls.darkColor' },
      {
        prop: 'icon',
        type: 'text',
        labelKey: 'controls.icon',
        helperText: 'e.g. pi-link, pi-send',
      },
    ],
  },
  {
    id: 'blur-overlay',
    nameKey: 'component.blurOverlay.name',
    descriptionKey: 'component.blurOverlay.description',
    component: BlurOverlay,
    defaultProps: {
      blurLevel: 14,
    },
    controls: [
      {
        prop: 'blurLevel',
        type: 'number',
        labelKey: 'controls.blurLevel',
        min: 0,
        max: 30,
        step: 1,
      },
    ],
  },
  {
    id: 'loading-overlay',
    nameKey: 'component.loadingOverlay.name',
    descriptionKey: 'component.loadingOverlay.description',
    component: LoadingOverlay,
    defaultProps: {
      blurLevel: 14,
      description: 'Fetching analytics dashboard…',
    },
    controls: [
      {
        prop: 'blurLevel',
        type: 'number',
        labelKey: 'controls.blurLevel',
        min: 0,
        max: 30,
        step: 1,
      },
      {
        prop: 'description',
        type: 'text',
        labelKey: 'controls.description',
      },
    ],
  },
];

export function getComponentDefinitionById(id: string): ComponentDefinition | undefined {
  return componentRegistry.find((definition) => definition.id === id);
}
