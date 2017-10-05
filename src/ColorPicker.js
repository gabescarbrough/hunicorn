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
  handleHueChange (event) {
    this.setState({hue: event.target.value})
  }
  handleSaturationChange (event) {
    this.setState({saturation: event.target.value})
  }
  handleLuminanceChange (event) {
    this.setState({luminance: event.target.value})
  }
  render () {
    return (
      <div className='color-picker'>
        <div className='color-card'
          style={{
            backgroundColor: 'hsl(' + this.state.hue + ',' + this.state.saturation + '%,' + this.state.luminance + '%)'
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
        <h4>hsl({this.state.hue}, {this.state.saturation}%, {this.state.luminance}%)</h4>
      </div>
    )
  }
}

export default ColorPicker
