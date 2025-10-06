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
