import type { Component } from 'vue'
import type { PlaygroundDemoConfig, ResolvedPlaygroundDemo } from './types'

type DemoModule = { default: Component; playgroundDemo?: PlaygroundDemoConfig }

type DemoLoader = () => Promise<ResolvedPlaygroundDemo>

const resolveDemo = async (importer: () => Promise<DemoModule>): Promise<ResolvedPlaygroundDemo> => {
  const module = await importer()
  const config = module.playgroundDemo

  if (!config) {
    throw new Error('Demo module is missing a playgroundDemo export')
  }

  return {
    ...config,
    preview: config.preview ?? (() => Promise.resolve(module.default)),
  }
}

const demoLoaders: Record<string, DemoLoader> = {
  'qr-code': () => resolveDemo(() => import('@/demos/QrCodeDemo.vue')),
  spinner: () => resolveDemo(() => import('@/demos/SpinnerDemo.vue')),
  'blur-overlay': () => resolveDemo(() => import('@/demos/BlurOverlayDemo.vue')),
  'loading-overlay': () => resolveDemo(() => import('@/demos/LoadingOverlayDemo.vue')),
}

export const loadPlaygroundDemo = async (id: string) => {
  const loader = demoLoaders[id]
  if (!loader) {
    return undefined
  }

  try {
    return await loader()
  } catch (error) {
    console.error(error)
    return undefined
  }
}
