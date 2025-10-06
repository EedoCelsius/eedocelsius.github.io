import type { AsyncComponentLoader } from 'vue'

export type LocaleCopy = {
  en: string
  ko: string
}

export type PlaygroundPropValue = string | number | boolean | null | undefined

export type ControlType = 'boolean' | 'slider' | 'color' | 'text' | 'textarea'

export interface ControlDefinition {
  key: string
  type: ControlType
  label: LocaleCopy
  helperText?: LocaleCopy
  min?: number
  max?: number
  step?: number
}

export interface GroupDefinition {
  id: string
  label: LocaleCopy
  controls: ControlDefinition[]
}

export type PropertyDefinition = ControlDefinition | GroupDefinition

export type ComponentLoader = AsyncComponentLoader<unknown>

export interface CatalogComponent {
  id: string
  name: LocaleCopy
  description: LocaleCopy
}

export interface LabDemoDefinition {
  id: string
  component: ComponentLoader
  properties: PropertyDefinition[]
  preview?: ComponentLoader
}

export interface LabComponentDefinition extends CatalogComponent {
  component: ComponentLoader
  preview: ComponentLoader
  properties: PropertyDefinition[]
}
