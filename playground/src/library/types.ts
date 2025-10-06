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

export interface CatalogComponent {
  id: string
  name: LocaleCopy
  description: LocaleCopy
}

export interface PlaygroundDemoConfig {
  component: AsyncComponentLoader<unknown>
  preview?: AsyncComponentLoader<unknown>
  properties: PropertyDefinition[]
}

export interface ResolvedPlaygroundDemo extends PlaygroundDemoConfig {
  preview: AsyncComponentLoader<unknown>
}

export type PlaygroundComponent = CatalogComponent & ResolvedPlaygroundDemo
