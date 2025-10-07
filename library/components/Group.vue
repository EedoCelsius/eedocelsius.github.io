<script lang="ts">
export const defaultProps = {
  as: 'div',
} as const

export type props = {
  as?: keyof HTMLElementTagNameMap
}
</script>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

defineOptions({
  name: 'Group',
})

defineSlots<{
  default: () => unknown
}>()

const props = withDefaults(defineProps<props>(), defaultProps)

const rootRef = ref<HTMLElement | null>(null)

const CORNER_CLASSES = [
  'group-corner-top-left',
  'group-corner-top-right',
  'group-corner-bottom-left',
  'group-corner-bottom-right',
] as const

const scheduleUpdate = (() => {
  if (typeof window === 'undefined') {
    return () => undefined
  }

  let frame = 0

  const updateCornerRadius = () => {
    const root = rootRef.value

    if (!root) return

    const children = Array.from(root.children).filter(
      (child): child is HTMLElement => child instanceof HTMLElement,
    )

    if (!children.length) return

    const entries = children.map((child) => {
      child.classList.add('group-item')

      for (const cornerClass of CORNER_CLASSES) {
        child.classList.remove(cornerClass)
      }

      return { child, rect: child.getBoundingClientRect() }
    })

    const EPSILON = 1

    const topMost = Math.min(...entries.map(({ rect }) => rect.top))
    const bottomMost = Math.max(...entries.map(({ rect }) => rect.bottom))
    const leftMost = Math.min(...entries.map(({ rect }) => rect.left))
    const rightMost = Math.max(...entries.map(({ rect }) => rect.right))

    const topRow = entries.filter(({ rect }) => rect.top - topMost <= EPSILON)
    const bottomRow = entries.filter(({ rect }) => bottomMost - rect.bottom <= EPSILON)
    const leftColumn = entries.filter(({ rect }) => rect.left - leftMost <= EPSILON)
    const rightColumn = entries.filter(({ rect }) => rightMost - rect.right <= EPSILON)

    const topLeft = topRow.reduce((candidate, entry) => {
      if (!candidate || entry.rect.left < candidate.rect.left) return entry

      return candidate
    }, undefined as (typeof entries)[number] | undefined)

    const topRight = topRow.reduce((candidate, entry) => {
      if (!candidate || entry.rect.right > candidate.rect.right) return entry

      return candidate
    }, undefined as (typeof entries)[number] | undefined)

    const bottomLeft = bottomRow.reduce((candidate, entry) => {
      if (!candidate || entry.rect.left < candidate.rect.left) return entry

      return candidate
    }, undefined as (typeof entries)[number] | undefined)

    const bottomRight = bottomRow.reduce((candidate, entry) => {
      if (!candidate || entry.rect.right > candidate.rect.right) return entry

      return candidate
    }, undefined as (typeof entries)[number] | undefined)

    const assignCorner = (
      entry: (typeof entries)[number] | undefined,
      className: (typeof CORNER_CLASSES)[number],
    ) => {
      if (!entry) return

      entry.child.classList.add(className)
    }

    const addLeftColumnCorners = () => {
      const leftTop = leftColumn.reduce((candidate, entry) => {
        if (!candidate || entry.rect.top < candidate.rect.top) return entry

        return candidate
      }, undefined as (typeof entries)[number] | undefined)

      const leftBottom = leftColumn.reduce((candidate, entry) => {
        if (!candidate || entry.rect.bottom > candidate.rect.bottom) return entry

        return candidate
      }, undefined as (typeof entries)[number] | undefined)

      assignCorner(leftTop, 'group-corner-top-left')
      assignCorner(leftBottom, 'group-corner-bottom-left')
    }

    const addRightColumnCorners = () => {
      const rightTop = rightColumn.reduce((candidate, entry) => {
        if (!candidate || entry.rect.top < candidate.rect.top) return entry

        return candidate
      }, undefined as (typeof entries)[number] | undefined)

      const rightBottom = rightColumn.reduce((candidate, entry) => {
        if (!candidate || entry.rect.bottom > candidate.rect.bottom) return entry

        return candidate
      }, undefined as (typeof entries)[number] | undefined)

      assignCorner(rightTop, 'group-corner-top-right')
      assignCorner(rightBottom, 'group-corner-bottom-right')
    }

    assignCorner(topLeft, 'group-corner-top-left')
    assignCorner(topRight, 'group-corner-top-right')
    assignCorner(bottomLeft, 'group-corner-bottom-left')
    assignCorner(bottomRight, 'group-corner-bottom-right')

    if (!topLeft && leftColumn.length) addLeftColumnCorners()
    if (!bottomLeft && leftColumn.length) addLeftColumnCorners()
    if (!topRight && rightColumn.length) addRightColumnCorners()
    if (!bottomRight && rightColumn.length) addRightColumnCorners()
  }

  const schedule = () => {
    window.cancelAnimationFrame(frame)
    frame = window.requestAnimationFrame(updateCornerRadius)
  }

  return schedule
})()

let observer: MutationObserver | null = null
let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  scheduleUpdate()

  const root = rootRef.value

  if (!root || typeof window === 'undefined') return

  observer = new MutationObserver(() => scheduleUpdate())

  observer.observe(root, { childList: true })

  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(() => scheduleUpdate())
    resizeObserver.observe(root)
  }

  window.addEventListener('resize', scheduleUpdate)
})

onBeforeUnmount(() => {
  if (typeof window === 'undefined') return

  observer?.disconnect()
  observer = null

  resizeObserver?.disconnect()
  resizeObserver = null

  window.removeEventListener('resize', scheduleUpdate)
})
</script>

<template>
  <component ref="rootRef" :is="props.as" class="group-root overflow-hidden">
    <slot />
  </component>
</template>

<style scoped>
.group-root ::v-slotted(.group-item) {
  border-radius: 0 !important;
}

.group-root ::v-slotted(.group-corner-top-left) {
  border-top-left-radius: revert !important;
}

.group-root ::v-slotted(.group-corner-top-right) {
  border-top-right-radius: revert !important;
}

.group-root ::v-slotted(.group-corner-bottom-left) {
  border-bottom-left-radius: revert !important;
}

.group-root ::v-slotted(.group-corner-bottom-right) {
  border-bottom-right-radius: revert !important;
}
</style>
