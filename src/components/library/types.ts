import type { Component } from 'vue';

export type PropControlType = 'text' | 'textarea' | 'color' | 'number';

export interface ComponentPropControl {
  key: string;
  type: PropControlType;
  labelKey: string;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
}

export interface LibraryComponent {
  id: string;
  translationKey: string;
  component: Component;
  defaultProps: Record<string, unknown>;
  controls: ComponentPropControl[];
}
