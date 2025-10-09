import ActionableCardDemo, { demoConfig as actionableCardConfig } from './ActionableCardDemo.vue'
import OverlayContainerDemo, { demoConfig as overlayContainerConfig } from './OverlayContainerDemo.vue'
import GroupDemo, { demoConfig as groupConfig } from './GroupDemo.vue'
import QrCodeDemo, { demoConfig as qrCodeConfig } from './QrCodeDemo.vue'
import SpinnerDemo, { demoConfig as spinnerConfig } from './SpinnerDemo.vue'
import type { ComponentDemo } from './types'

const demoEntries: Record<string, ComponentDemo> = {
  group: {
    component: GroupDemo,
    ...groupConfig,
  },
  'actionable-card': {
    component: ActionableCardDemo,
    ...actionableCardConfig,
  },
  'overlay-container': {
    component: OverlayContainerDemo,
    ...overlayContainerConfig,
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
