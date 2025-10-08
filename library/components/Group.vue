<script lang="ts">
import { defineComponent } from 'vue'

export const defaultProps = {} as const

export type props = {}

const CORNER_CLASSES = [
  'group-corner-top-left',
  'group-corner-top-right',
  'group-corner-bottom-left',
  'group-corner-bottom-right',
] as const

const EPSILON = 1

type CornerEntry = {
  child: HTMLElement
  rect: DOMRect
}

const isHTMLElement = (element: Element): element is HTMLElement => element instanceof HTMLElement

const resetCornerMarkers = (child: HTMLElement) => {
  child.classList.add('group-item')

  for (const corner of CORNER_CLASSES) {
    child.classList.remove(corner)
  }
}

const pickClosestEntries = (
  entries: CornerEntry[],
  target: number,
  projector: (rect: DOMRect) => number
) => entries.filter(({ rect }) => Math.abs(projector(rect) - target) <= EPSILON)

const pickExtremeEntry = (
  entries: CornerEntry[],
  projector: (rect: DOMRect) => number,
  isBetter: (candidate: number, current: number) => boolean
): CornerEntry | undefined =>
  entries.reduce<CornerEntry | undefined>((best, entry) => {
    if (!best) return entry

    return isBetter(projector(entry.rect), projector(best.rect)) ? entry : best
  }, undefined)

const markCorner = (entry: CornerEntry | undefined, className: (typeof CORNER_CLASSES)[number]) => {
  entry?.child.classList.add(className)
}

export default defineComponent({
  name: 'Group',
  data() {
    return {
      frame: 0,
      observer: null as MutationObserver | null,
      resizeObserver: null as ResizeObserver | null,
    }
  },
  methods: {
    scheduleUpdate(): void {
      if (typeof window === 'undefined') return

      window.cancelAnimationFrame(this.frame)
      this.frame = window.requestAnimationFrame(() => this.updateCornerRadius())
    },
    updateCornerRadius(): void {
      const root = this.$refs.root as HTMLElement | undefined

      if (!root) return

      const children = Array.from(root.children).filter(isHTMLElement)

      if (!children.length) return

      const entries = children.map<CornerEntry>((child) => {
        resetCornerMarkers(child)
        return { child, rect: child.getBoundingClientRect() }
      })

      const topMost = Math.min(...entries.map(({ rect }) => rect.top))
      const bottomMost = Math.max(...entries.map(({ rect }) => rect.bottom))
      const leftMost = Math.min(...entries.map(({ rect }) => rect.left))
      const rightMost = Math.max(...entries.map(({ rect }) => rect.right))

      const topRow = pickClosestEntries(entries, topMost, (rect) => rect.top)
      const bottomRow = pickClosestEntries(entries, bottomMost, (rect) => rect.bottom)
      const leftColumn = pickClosestEntries(entries, leftMost, (rect) => rect.left)
      const rightColumn = pickClosestEntries(entries, rightMost, (rect) => rect.right)

      const topLeft = pickExtremeEntry(topRow, (rect) => rect.left, (candidate, current) => candidate < current)
      const topRight = pickExtremeEntry(topRow, (rect) => rect.right, (candidate, current) => candidate > current)
      const bottomLeft = pickExtremeEntry(bottomRow, (rect) => rect.left, (candidate, current) => candidate < current)
      const bottomRight = pickExtremeEntry(bottomRow, (rect) => rect.right, (candidate, current) => candidate > current)

      const ensureColumnCorners = (
        columnEntries: CornerEntry[],
        topClass: (typeof CORNER_CLASSES)[number],
        bottomClass: (typeof CORNER_CLASSES)[number]
      ) => {
        if (!columnEntries.length) return

        const top = pickExtremeEntry(columnEntries, (rect) => rect.top, (candidate, current) => candidate < current)
        const bottom = pickExtremeEntry(columnEntries, (rect) => rect.bottom, (candidate, current) => candidate > current)

        markCorner(top, topClass)
        markCorner(bottom, bottomClass)
      }

      markCorner(topLeft, 'group-corner-top-left')
      markCorner(topRight, 'group-corner-top-right')
      markCorner(bottomLeft, 'group-corner-bottom-left')
      markCorner(bottomRight, 'group-corner-bottom-right')

      if (!topLeft || !bottomLeft) {
        ensureColumnCorners(leftColumn, 'group-corner-top-left', 'group-corner-bottom-left')
      }

      if (!topRight || !bottomRight) {
        ensureColumnCorners(rightColumn, 'group-corner-top-right', 'group-corner-bottom-right')
      }
    },
    handleStructuralChange(): void {
      this.scheduleUpdate()
    },
    cleanupObservers(): void {
      this.observer?.disconnect()
      this.observer = null

      this.resizeObserver?.disconnect()
      this.resizeObserver = null
    },
  },
  mounted() {
    this.scheduleUpdate()

    const root = this.$refs.root as HTMLElement | undefined

    if (!root || typeof window === 'undefined') return

    this.observer = new MutationObserver(() => this.handleStructuralChange())
    this.observer.observe(root, { childList: true })

    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => this.handleStructuralChange())
      this.resizeObserver.observe(root)
    }

    window.addEventListener('resize', this.scheduleUpdate)
  },
  beforeUnmount() {
    if (typeof window === 'undefined') return

    window.cancelAnimationFrame(this.frame)
    this.cleanupObservers()
    window.removeEventListener('resize', this.scheduleUpdate)
  },
})
</script>

<template>
  <div ref="root" class="group-root">
    <slot />
  </div>
</template>

<style scoped>
.group-root ::v-slotted(.group-item) {
  border-radius: 0 !important;
}

.group-root ::v-slotted(.group-corner-top-left) {
  border-top-left-radius: inherit !important;
}

.group-root ::v-slotted(.group-corner-top-right) {
  border-top-right-radius: inherit !important;
}

.group-root ::v-slotted(.group-corner-bottom-left) {
  border-bottom-left-radius: inherit !important;
}

.group-root ::v-slotted(.group-corner-bottom-right) {
  border-bottom-right-radius: inherit !important;
}
</style>
