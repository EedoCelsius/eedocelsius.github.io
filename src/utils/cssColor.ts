export const normalizeCssColor = (color: string): string => {
  const context = getCanvasContext()
  if (!context) {
    return color
  }

  context.fillStyle = color
  return normalizeCanvasColor(context.fillStyle)
}

let cachedContext: CanvasRenderingContext2D | null = null

const getCanvasContext = () => {
  if (cachedContext) {
    return cachedContext
  }

  if (typeof document === 'undefined') {
    return null
  }

  const canvas = document.createElement('canvas')
  canvas.width = 1
  canvas.height = 1

  cachedContext = canvas.getContext('2d')
  return cachedContext
}

const normalizeCanvasColor = (value: string | CanvasGradient | CanvasPattern): string => {
  if (typeof value === 'string' && value.startsWith('#')) {
    return hexToRgbOrRgba(value)
  }

  return value as string
}

const hexToRgbOrRgba = (value: string): string => {
  const hex = value.replace('#', '')
  if (hex.length === 3 || hex.length === 4) {
    const expanded = hex
      .split('')
      .map((char) => char + char)
      .join('')
    return hexToRgbOrRgba(`#${expanded}`)
  }

  if (hex.length !== 6 && hex.length !== 8) {
    return value
  }

  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)
  const hasAlpha = hex.length === 8
  const a = hasAlpha ? parseInt(hex.slice(6, 8), 16) / 255 : 1

  const roundedAlpha = Math.round(a * 1000) / 1000
  if (!hasAlpha || roundedAlpha === 1) {
    return `rgb(${r}, ${g}, ${b})`
  }

  return `rgba(${r}, ${g}, ${b}, ${roundedAlpha})`
}
