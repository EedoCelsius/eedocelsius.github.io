const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)
const toByte = (value: number) => Math.round(clamp(value, 0, 1) * 255)

const srgbComponentsToCssColor = (r: number, g: number, b: number, alpha?: number) => {
  const rByte = toByte(r)
  const gByte = toByte(g)
  const bByte = toByte(b)

  if (alpha === undefined || Number.isNaN(alpha) || alpha >= 1) {
    return `rgb(${rByte}, ${gByte}, ${bByte})`
  }

  const normalizedAlpha = clamp(alpha, 0, 1)
  const alphaRounded = Number.isInteger(normalizedAlpha)
    ? normalizedAlpha
    : parseFloat(normalizedAlpha.toFixed(3))
  const alphaString = `${alphaRounded}`
  return `rgba(${rByte}, ${gByte}, ${bByte}, ${alphaString})`
}

const colorComponentStringToNumber = (value: string) => {
  if (value.endsWith('%')) {
    return parseFloat(value) / 100
  }

  return parseFloat(value)
}

const cssColorStringToCssRgba = (value: string) => {
  const trimmed = value.trim()

  if (/^rgb(a)?\(/i.test(trimmed) || /^#/.test(trimmed)) {
    return trimmed
  }

  const srgbMatch = trimmed.match(/^color\(srgb\s+([^\s/]+)\s+([^\s/]+)\s+([^\s/]+)(?:\s*\/\s*([^\s)]+))?\)$/i)
  if (srgbMatch) {
    const rValue = colorComponentStringToNumber(srgbMatch[1]!)
    const gValue = colorComponentStringToNumber(srgbMatch[2]!)
    const bValue = colorComponentStringToNumber(srgbMatch[3]!)
    const alphaValue = srgbMatch[4]
      ? colorComponentStringToNumber(srgbMatch[4]!)
      : undefined

    return srgbComponentsToCssColor(rValue, gValue, bValue, alphaValue)
  }

  const oklabMatch = trimmed.match(/^oklab\(\s*([^\s/]+)\s+([^\s/]+)\s+([^\s/]+)(?:\s*\/\s*([^\s)]+))?\s*\)$/i)
  if (oklabMatch) {
    const lValue = parseFloat(oklabMatch[1]!)
    const aValue = parseFloat(oklabMatch[2]!)
    const bValue = parseFloat(oklabMatch[3]!)
    const alphaValue = oklabMatch[4]
      ? colorComponentStringToNumber(oklabMatch[4]!)
      : undefined

    const l_ = lValue + 0.3963377774 * aValue + 0.2158037573 * bValue
    const m_ = lValue - 0.1055613458 * aValue - 0.0638541728 * bValue
    const s_ = lValue - 0.0894841775 * aValue - 1.291485548 * bValue

    const l3 = l_ ** 3
    const m3 = m_ ** 3
    const s3 = s_ ** 3

    const linearToSrgb = (component: number) =>
      component <= 0.0031308 ? 12.92 * component : 1.055 * component ** (1 / 2.4) - 0.055

    const r = linearToSrgb(4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3)
    const g = linearToSrgb(-1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3)
    const b = linearToSrgb(-0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3)

    return srgbComponentsToCssColor(r, g, b, alphaValue)
  }

  return trimmed
}

let colorResolver: HTMLDivElement | null = null

const toHexComponent = (value: number) => Math.round(clamp(value, 0, 255)).toString(16).padStart(2, '0')

export const rgbaToHex = (value: string) => {
  const match = value.match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)$/i)
  if (!match) {
    return ''
  }

  const r = parseFloat(match[1]!)
  const g = parseFloat(match[2]!)
  const b = parseFloat(match[3]!)
  const alpha = match[4] !== undefined ? parseFloat(match[4]) : undefined
  const rHex = toHexComponent(r)
  const gHex = toHexComponent(g)
  const bHex = toHexComponent(b)

  if (alpha === undefined || Number.isNaN(alpha) || alpha >= 1) {
    return `#${rHex}${gHex}${bHex}`
  }

  const alphaHex = toHexComponent(alpha * 255)
  return `#${rHex}${gHex}${bHex}${alphaHex}`
}

const resolveColor = (value: string | undefined) => {
  if (!value) {
    return ''
  }

  const trimmed = value.trim()
  const fallback = cssColorStringToCssRgba(trimmed)
  if (typeof document === 'undefined') {
    return fallback
  }

  if (!colorResolver || !colorResolver.isConnected) {
    colorResolver = document.createElement('div')
    colorResolver.hidden = true
    document.body.appendChild(colorResolver)
  }

  const resolver = colorResolver

  if (!resolver) {
    return fallback
  }

  resolver.style.color = ''
  resolver.style.color = trimmed
  const resolved = globalThis.getComputedStyle?.(resolver)?.color

  if (!resolved) {
    return fallback
  }

  return cssColorStringToCssRgba(resolved)
}

export const toRgba = (value: string | undefined) => resolveColor(value)

export const toHex = (value: string | undefined) => {
  const rgba = resolveColor(value)

  if (!rgba) {
    return ''
  }

  if (rgba.startsWith('#')) {
    return rgba
  }

  return rgbaToHex(rgba)
}
