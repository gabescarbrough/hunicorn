import React, { Component } from 'react'
import './ColorPicker.css'

class ColorPicker extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hue: 180,
      saturation: 50,
      luminance: 50
    }
  }
  isHsl (color) {
    return color.match(/hsl\(\s*(\d{1,3})\s*,\s*(\d+(?:\.\d+)?%)\s*,\s*(\d+(?:\.\d+)?%)\)/g)
  }
  isHex (color) {
    return color.match(/^#([A-Fa-f0-9][A-Fa-f0-9])([A-Fa-f0-9][A-Fa-f0-9])([A-Fa-f0-9][A-Fa-f0-9])|#([A-Fa-f0-9])([A-Fa-f0-9])([A-Fa-f0-9])$/g)
  }
  isRgb (color) {
    return color.match(/rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/g)
  }
  rgbToHsl (color) {
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
  hexToRgb (hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    if (hex.length === 4) {
      hex = hex[0] + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3]
    }

    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? `rgb(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)})` : null
  }
  setHslState (color) {
    let res = /hsl\(\s*(\d{1,3})\s*,\s*(\d+(?:\.\d+)?)%\s*,\s*(\d+(?:\.\d+)?)%\)/g.exec(color).slice(1)
    this.setState({hue: res[0]})
    this.setState({saturation: res[1]})
    this.setState({luminance: res[2]})
  }
  handleHueChange (event) {
    this.setState({hue: event.target.value})
  }
  handleSaturationChange (event) {
    this.setState({saturation: event.target.value})
  }
  handleLuminanceChange (event) {
    this.setState({luminance: event.target.value})
  }
  handleTextInputChange (event) {
    let color = event.target.value
    if (this.isHsl(color)) {
      this.setHslState(color)
    } else if (this.isHex(color)) {
      this.setHslState(this.rgbToHsl(this.hexToRgb(color)))
    } else if (this.isRgb(color)) {
      this.setHslState(this.rgbToHsl(color))
    }
  }
  render () {
    let hslString = 'hsl(' + this.state.hue + ',' + this.state.saturation + '%,' + this.state.luminance + '%)'
    return (
      <div className='color-picker'>
        <div className='color-card'
          style={{
            backgroundColor: hslString
          }} />
        <label className='range-label'>Hue
          <input className='range' min='0' max='360'
            value={this.state.hue} type='range'
            onChange={this.handleHueChange.bind(this)} />
        </label>
        <label className='range-label'>Saturation
          <input className='range' min='0' max='100'
            value={this.state.saturation} type='range'
            onChange={this.handleSaturationChange.bind(this)} />
        </label>
        <label className='range-label'>Luminance
          <input className='range' min='0' max='100'
            value={this.state.luminance}
            type='range' onChange={this.handleLuminanceChange.bind(this)} />
        </label>
        <input
          type='text'
          value={hslString}
          onChange={this.handleTextInputChange.bind(this)}
        />
      </div>
    )
  }
}

export default ColorPicker
