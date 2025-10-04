import type { Component } from 'vue'

export interface LibraryComponentDefinition {
  slug: string
  i18nKey: string
  tags: string[]
  component: () => Promise<{ default: Component }>
  playground: () => Promise<{ default: Component }>
  defaultProps: Record<string, unknown>
  previewHeight?: number
}
