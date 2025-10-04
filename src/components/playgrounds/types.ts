export type ControlType = 'text' | 'number' | 'textarea' | 'url'

export interface PropControlDefinition {
  prop: string
  type: ControlType
  labelKey: string
  helperKey?: string
  min?: number
  max?: number
  step?: number
}
