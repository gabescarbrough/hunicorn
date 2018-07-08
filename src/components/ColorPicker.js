import React, { Component } from 'react'
import ColorInput from './ColorInput'
import './ColorPicker.css'
import {isHsl, isHex, rgbToHsl, hslToHex,  hexToRgb} from '../colorUtilities.js'

class ColorPicker extends Component {
  constructor (props) {
    super(props)
    this.handleHexInputChange = this.handleHexInputChange.bind(this)
    this.handleHslInputChange = this.handleHslInputChange.bind(this)
    this.state = {
      hue: this.props.hue,
      saturation: this.props.saturation,
      luminance: this.props.luminance,
      hslInputTemp: '',
      hexInputTemp: ''
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
  handleHslInputChange (event) {
    let color = event.target.value
    if (isHsl(color)) {
      this.setHslState(color)
      this.setState({hslInputTemp: ''})
      this.setState({hexInputTemp: ''})
    } else {
      this.setState({hslInputTemp: color})
    }
  }
  handleHexInputChange (event) {
    let color = event.target.value
    if (isHex(color)) {
      this.setHslState(rgbToHsl(hexToRgb(color)))
      this.setState({hslInputTemp: ''})
      this.setState({hexInputTemp: ''})
    } else {
      this.setState({hexInputTemp: color})
    }
  }
  render () {
    let hslString = 'hsl(' + this.state.hue + ',' + this.state.saturation + '%,' + this.state.luminance + '%)'
    let hexString = hslToHex(this.state.hue, this.state.saturation, this.state.luminance)
    return (
      <div className='color' style={{backgroundColor: hslString}}>
        <div className="color-inputs">
          <label className='range-label' style={this.state.luminance < 50 ? {color: 'hsla(0,0%,100%,.6)'} : {color: 'hsla(0,0%,0%,.6)'}}>
            Hue
            <input className='range' min='0' max='360'
              value={this.state.hue} type='range'
              onChange={this.handleHueChange.bind(this)} />
          </label>
          <label className='range-label' style={this.state.luminance < 50 ? {color: 'hsla(0,0%,100%,.6)'} : {color: 'hsla(0,0%,0%,.6)'}}>
            Saturation
            <input className='range' min='0' max='100'
              value={this.state.saturation} type='range'
              onChange={this.handleSaturationChange.bind(this)} />
          </label>
          <label className='range-label' style={this.state.luminance < 50 ? {color: 'hsla(0,0%,100%,.6)'} : {color: 'hsla(0,0%,0%,.6)'}}>
            Luminance
            <input className='range' min='0' max='100'
              value={this.state.luminance}
              type='range' onChange={this.handleLuminanceChange.bind(this)} />
          </label>
          <ColorInput color={hslString} temp={this.state.hslInputTemp} onColorInputChange={this.handleHslInputChange} />
          <ColorInput color={hexString} temp={this.state.hexInputTemp} onColorInputChange={this.handleHexInputChange} />
          <input type="checkbox" />
        </div>
      </div>
    )
  }
}

export default ColorPicker
