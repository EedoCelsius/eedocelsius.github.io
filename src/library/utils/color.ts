const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

const toByte = (value: number) => Math.round(clamp(value, 0, 1) * 255)

const toRgbString = (r: number, g: number, b: number, alpha?: number) => {
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

const parseNumber = (value: string) => {
  if (value.endsWith('%')) {
    return parseFloat(value) / 100
  }

  return parseFloat(value)
}

const parseSrgbColor = (value: string) => {
  const match = value.match(/^color\(srgb\s+([^\s/]+)\s+([^\s/]+)\s+([^\s/]+)(?:\s*\/\s*([^\s)]+))?\)$/i)
  if (!match) {
    return null
  }

  const r = match[1]!
  const g = match[2]!
  const b = match[3]!
  const alpha = match[4]
  const rValue = parseNumber(r)
  const gValue = parseNumber(g)
  const bValue = parseNumber(b)
  const alphaValue = alpha ? parseNumber(alpha) : undefined

  return toRgbString(rValue, gValue, bValue, alphaValue)
}

const oklabToSrgb = (l: number, a: number, b: number) => {
  const l_ = l + 0.3963377774 * a + 0.2158037573 * b
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b
  const s_ = l - 0.0894841775 * a - 1.291485548 * b

  const l3 = l_ ** 3
  const m3 = m_ ** 3
  const s3 = s_ ** 3

  const rLinear = 4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3
  const gLinear = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3
  const bLinear = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3

  const linearToSrgb = (component: number) =>
    component <= 0.0031308 ? 12.92 * component : 1.055 * component ** (1 / 2.4) - 0.055

  return {
    r: linearToSrgb(rLinear),
    g: linearToSrgb(gLinear),
    b: linearToSrgb(bLinear),
  }
}

const parseOklabColor = (value: string) => {
  const match = value.match(/^oklab\(\s*([^\s/]+)\s+([^\s/]+)\s+([^\s/]+)(?:\s*\/\s*([^\s)]+))?\s*\)$/i)
  if (!match) {
    return null
  }

  const l = match[1]!
  const a = match[2]!
  const b = match[3]!
  const alpha = match[4]
  const lValue = parseFloat(l)
  const aValue = parseFloat(a)
  const bValue = parseFloat(b)
  const alphaValue = alpha ? parseNumber(alpha) : undefined

  const { r, g, b: blue } = oklabToSrgb(lValue, aValue, bValue)
  return toRgbString(r, g, blue, alphaValue)
}

export const normalizeComputedColor = (value: string) => {
  const trimmed = value.trim()

  if (/^rgb(a)?\(/i.test(trimmed) || /^#/.test(trimmed)) {
    return trimmed
  }

  return parseSrgbColor(trimmed) ?? parseOklabColor(trimmed) ?? trimmed
}
