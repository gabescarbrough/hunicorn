export function isHsl (color) {
  return color.match(/hsl\(\s*(\d{1,3})\s*,\s*(\d+(?:\.\d+)?%)\s*,\s*(\d+(?:\.\d+)?%)\)/g)
}
export function isHex (color) {
  return color.match(/^#([A-Fa-f0-9][A-Fa-f0-9])([A-Fa-f0-9][A-Fa-f0-9])([A-Fa-f0-9][A-Fa-f0-9])|#([A-Fa-f0-9])([A-Fa-f0-9])([A-Fa-f0-9])$/g)
}
export function isRgb (color) {
  return color.match(/rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/g)
}
export function rgbToHsl (color) {
  let rgbArr = /rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/g.exec(color).slice(1)
  let r = rgbArr[0]
  let g = rgbArr[1]
  let b = rgbArr[2]

  r /= 255
  g /= 255
  b /= 255

  let max = Math.max(r, g, b)
  let min = Math.min(r, g, b)
  let h = (max + min) / 2
  let s = (max + min) / 2
  let l = (max + min) / 2

  if (max === min) {
    h = s = 0 // achromatic
  } else {
    let d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
      default: break
    }

    h /= 6
  }
  return `hsl(${Math.floor(h * 360)},${Math.floor(s * 100)}%,${Math.floor(l * 100)}%)`
}
export function hexToRgb (hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  if (hex.length === 4) {
    hex = hex[0] + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3]
  }

  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? `rgb(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)})` : null
}