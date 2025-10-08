<script lang="ts">
import Card from 'primevue/card'
import { defineComponent } from 'vue'

export const defaultProps = {
  blurStrength: 7,
  backgroundColor: 'rgba(0, 0, 0, 0.25)',
  centerVertical: true,
  centerHorizontal: true,
} as const

export type props = {
  blurStrength?: number
  backgroundColor?: string
  centerVertical?: boolean
  centerHorizontal?: boolean
}

export default defineComponent({
  name: 'BlurOverlay',
  components: { Card },
  props: {
    blurStrength: {
      type: Number,
      default: defaultProps.blurStrength,
    },
    backgroundColor: {
      type: String,
      default: defaultProps.backgroundColor,
    },
    centerVertical: {
      type: Boolean,
      default: defaultProps.centerVertical,
    },
    centerHorizontal: {
      type: Boolean,
      default: defaultProps.centerHorizontal,
    },
  },
  computed: {
    overlayStyle(): Record<string, string> {
      const blur = `blur(${this.blurStrength}px)`

      return {
        backdropFilter: blur,
        WebkitBackdropFilter: blur,
        background: this.backgroundColor,
        '--blur-overlay-justify-content': this.centerVertical ? 'center' : 'flex-start',
        '--blur-overlay-align-items': this.centerHorizontal ? 'center' : 'flex-start',
      }
    },
  },
})
</script>

<template>
  <transition name="fade-blur">
    <Card
      class="absolute inset-0 h-full w-full rounded-inherit border-none shadow-none"
      :style="overlayStyle"
    >
      <template v-for="(_, name) in $slots" :key="name" v-slot:[name]="data">
        <slot :name="name" v-bind="data" />
      </template>
    </Card>
  </transition>
</template>

<style scoped>
.fade-blur-enter-active,
.fade-blur-leave-active {
  transition: opacity 200ms ease;
}

.fade-blur-enter-from,
.fade-blur-leave-to {
  opacity: 0;
}

.rounded-inherit {
  border-radius: inherit;
}

:deep(.p-card) {
  height: 100%;
}

:deep(.p-card-body) {
  display: flex;
  height: 100%;
  width: 100%;
  align-items: var(--blur-overlay-align-items);
  justify-content: var(--blur-overlay-justify-content);
  text-align: center;
}
</style>
