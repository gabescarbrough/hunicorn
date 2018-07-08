import React, { Component } from 'react'
import ColorInput from './ColorInput'
import './ColorPicker.css'
import {isHsl, isHex, rgbToHsl, hslToHex,  hexToRgb} from '../colorUtilities.js'

class ColorPicker extends Component {
  constructor (props) {
    super(props)
    this.removeColor = this.removeColor.bind(this)
    this.handleHueChange = this.handleHueChange.bind(this)
    this.handleSaturationChange = this.handleSaturationChange.bind(this)
    this.handleLuminanceChange = this.handleLuminanceChange.bind(this)
    this.handleLockChange = this.handleLockChange.bind(this)
    this.setHslState = this.setHslState.bind(this)

    this.handleHexInputChange = this.handleHexInputChange.bind(this)
    this.handleHslInputChange = this.handleHslInputChange.bind(this)

    this.state = {
      hslInputTemp: '',
      hexInputTemp: ''
    }
  }

  removeColor(index) {
    this.props.removeColor(this.props.index)
  }

  handleHueChange(event, index) {
    this.props.onHueChange(event, this.props.index)
  }
    
  handleSaturationChange(event, index) {
    this.props.onSaturationChange(event, this.props.index)
  }
    
  handleLuminanceChange(event, index) {
    this.props.onLuminanceChange(event, this.props.index)
  }

  handleLockChange(index) {
    this.props.onLockChange(this.props.index)
  }

  setHslState(event, index) {
    this.props.setHslState(event, this.props.index)
  }
 
  handleHslInputChange (event) {
    let color = event.target.value
    if (isHsl(color)) {
      this.setHslState(color, this.props.index)
      this.setState({hslInputTemp: ''})
      this.setState({hexInputTemp: ''})
    } else {
      this.setState({hslInputTemp: color})
    }
  }
  handleHexInputChange (event) {
    let color = event.target.value
    if (isHex(color)) {
      this.setHslState(rgbToHsl(hexToRgb(color)), this.props.index)
      this.setState({hslInputTemp: ''})
      this.setState({hexInputTemp: ''})
    } else {
      this.setState({hexInputTemp: color})
    }
  }
  render () {
    let hslString = 'hsl(' + this.props.hue + ',' + this.props.saturation + '%,' + this.props.luminance + '%)'
    let hexString = hslToHex(this.props.hue, this.props.saturation, this.props.luminance)
    return (
      <div className='color' style={{backgroundColor: hslString}}>
        <div className="color-inputs">
          <label className='range-label' style={this.props.luminance < 50 ? {color: 'hsla(0,0%,100%,.6)'} : {color: 'hsla(0,0%,0%,.6)'}}>
            Hue
            <input className='range' min='0' max='360'
              value={this.props.hue} type='range'
              onChange={this.handleHueChange} />
          </label>
          <label className='range-label' style={this.props.luminance < 50 ? {color: 'hsla(0,0%,100%,.6)'} : {color: 'hsla(0,0%,0%,.6)'}}>
            Saturation
            <input className='range' min='0' max='100'
              value={this.props.saturation} type='range'
              onChange={this.handleSaturationChange} />
          </label>
          <label className='range-label' style={this.props.luminance < 50 ? {color: 'hsla(0,0%,100%,.6)'} : {color: 'hsla(0,0%,0%,.6)'}}>
            Luminance
            <input className='range' min='0' max='100'
              value={this.props.luminance}
              type='range' onChange={this.handleLuminanceChange} />
          </label>
          <ColorInput color={hslString} temp={this.state.hslInputTemp} onColorInputChange={this.handleHslInputChange} />
          <ColorInput color={hexString} temp={this.state.hexInputTemp} onColorInputChange={this.handleHexInputChange} />
          <input type="checkbox" checked={this.props.locked} onClick={this.handleLockChange} />
          <button onClick={this.removeColor}>Remove</button>
        </div>
      </div>
    )
  }
}

export default ColorPicker
