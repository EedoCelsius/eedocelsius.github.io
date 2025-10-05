const clamp01 = (value: number) => Math.min(Math.max(value, 0), 1)

const formatAlpha = (alpha: number) => {
  const normalized = clamp01(alpha)
  if (normalized >= 1) {
    return null
  }
  const rounded = Math.round(normalized * 1000) / 1000
  return `${rounded}`
}

const formatRgbString = (r: number, g: number, b: number, alpha = 1) => {
  const red = Math.round(clamp01(r) * 255)
  const green = Math.round(clamp01(g) * 255)
  const blue = Math.round(clamp01(b) * 255)
  const alphaString = formatAlpha(alpha)

  if (alphaString === null) {
    return `rgb(${red}, ${green}, ${blue})`
  }

  return `rgba(${red}, ${green}, ${blue}, ${alphaString})`
}

const parseUnitValue = (value: string) => {
  const trimmed = value.trim()
  if (!trimmed) {
    return Number.NaN
  }

  if (trimmed === 'none') {
    return 0
  }

  if (trimmed.endsWith('%')) {
    return clamp01(Number.parseFloat(trimmed.slice(0, -1)) / 100)
  }

  const numeric = Number.parseFloat(trimmed)
  if (Number.isNaN(numeric)) {
    return Number.NaN
  }

  if (numeric > 1) {
    return clamp01(numeric / 255)
  }

  return clamp01(numeric)
}

const parseAlphaValue = (value: string | undefined) => {
  if (!value) {
    return 1
  }

  const trimmed = value.trim()
  if (!trimmed) {
    return 1
  }

  if (trimmed.endsWith('%')) {
    return clamp01(Number.parseFloat(trimmed.slice(0, -1)) / 100)
  }

  const numeric = Number.parseFloat(trimmed)
  if (Number.isNaN(numeric)) {
    return 1
  }

  return clamp01(numeric)
}

const oklabToSrgb = (l: number, a: number, b: number) => {
  const l_ = l + 0.3963377774 * a + 0.2158037573 * b
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b
  const s_ = l - 0.0894841775 * a - 1.291485548 * b

  const l3 = l_ ** 3
  const m3 = m_ ** 3
  const s3 = s_ ** 3

  const r = 4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3
  const g = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3
  const bChannel = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3

  return {
    r: clamp01(r),
    g: clamp01(g),
    b: clamp01(bChannel),
  }
}

const normalizeOklab = (input: string) => {
  const inside = input.slice(input.indexOf('(') + 1, input.lastIndexOf(')'))
  const [labPartRaw, alphaPart] = inside.split('/')
  const labTokens = (labPartRaw ?? '')
    .trim()
    .split(/\s+/)
    .filter((token) => token.length > 0)

  if (labTokens.length < 3) {
    return input
  }

  const labValues = labTokens.map((value) => Number.parseFloat(value))

  if (labValues.length < 3 || labValues.some((value) => Number.isNaN(value))) {
    return input
  }

  const [l, a, b] = labValues as [number, number, number]

  const { r, g, b: blue } = oklabToSrgb(l, a, b)
  const alpha = parseAlphaValue(alphaPart)

  return formatRgbString(r, g, blue, alpha)
}

const normalizeSrgbFunction = (input: string) => {
  const inside = input.slice(input.indexOf('(') + 1, input.lastIndexOf(')'))
  const [channelPartRaw, alphaPart] = inside.split('/')
  const channelPart = channelPartRaw ?? ''
  const channels = channelPart
    .replace(/^srgb\s*/i, '')
    .trim()
    .split(/\s+/)
    .filter((token) => token.length > 0)
    .map((value) => parseUnitValue(value))

  if (channels.length < 3 || channels.some((channel) => Number.isNaN(channel))) {
    return input
  }

  const [r, g, b] = channels as [number, number, number]
  const alpha = parseAlphaValue(alphaPart)

  return formatRgbString(r, g, b, alpha)
}

export const normalizeComputedColor = (value: string) => {
  const trimmed = value.trim()
  if (!trimmed) {
    return ''
  }

  if (/^rgba?\(/i.test(trimmed)) {
    return trimmed
  }

  if (/^oklab\(/i.test(trimmed)) {
    return normalizeOklab(trimmed)
  }

  if (/^color\(\s*srgb/i.test(trimmed)) {
    return normalizeSrgbFunction(trimmed)
  }

  return trimmed
}

export type NormalizeComputedColor = typeof normalizeComputedColor
