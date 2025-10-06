import ActionableCardDemo, { demoConfig as actionableCardConfig } from './ActionableCardDemo.vue'
import BlurOverlayDemo, { demoConfig as blurOverlayConfig } from './BlurOverlayDemo.vue'
import LoadingOverlayDemo, { demoConfig as loadingOverlayConfig } from './LoadingOverlayDemo.vue'
import QrCodeDemo, { demoConfig as qrCodeConfig } from './QrCodeDemo.vue'
import SpinnerDemo, { demoConfig as spinnerConfig } from './SpinnerDemo.vue'
import type { ComponentDemo } from './types'

const demoEntries: Record<string, ComponentDemo> = {
  'actionable-card': {
    component: ActionableCardDemo,
    ...actionableCardConfig,
  },
  'blur-overlay': {
    component: BlurOverlayDemo,
    ...blurOverlayConfig,
  },
  'loading-overlay': {
    component: LoadingOverlayDemo,
    ...loadingOverlayConfig,
  },
  'qr-code': {
    component: QrCodeDemo,
    ...qrCodeConfig,
  },
  spinner: {
    component: SpinnerDemo,
    ...spinnerConfig,
  },
}

export const componentDemos = demoEntries

export const getComponentDemo = (id: string) => componentDemos[id]
