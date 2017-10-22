import React, { Component } from 'react'
import './ColorPicker.css'
import {isHsl, isHex, isRgb, rgbToHsl, hexToRgb} from './colorUtilities.js'

class ColorPicker extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hue: 180,
      saturation: 50,
      luminance: 50
    }
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
    if (isHsl(color)) {
      this.setHslState(color)
    } else if (isHex(color)) {
      this.setHslState(rgbToHsl(hexToRgb(color)))
    } else if (isRgb(color)) {
      this.setHslState(rgbToHsl(color))
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
