import type { Component } from 'vue'
import type { PropertyDefinition } from '@/library/types'

export interface ComponentDemoConfig {
  properties: PropertyDefinition[]
  defaultProps?: Record<string, unknown>
}

export interface ComponentDemo extends ComponentDemoConfig {
  component: Component
}
