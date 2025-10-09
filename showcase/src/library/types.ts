export type LocaleCopy = {
  en: string
  ko: string
}

export type ShowcasePropValue = string | number | boolean | null | undefined

export type ControlType = 'boolean' | 'slider' | 'color' | 'text' | 'textarea' | 'select'

export interface ControlOption {
  label: LocaleCopy
  value: ShowcasePropValue
}

export interface ControlDefinition {
  key: string
  type: ControlType
  label: LocaleCopy
  helperText?: LocaleCopy
  min?: number
  max?: number
  step?: number
  options?: ControlOption[]
}

export interface GroupDefinition {
  id: string
  label: LocaleCopy
  controls: ControlDefinition[]
}

export type PropertyDefinition = ControlDefinition | GroupDefinition
