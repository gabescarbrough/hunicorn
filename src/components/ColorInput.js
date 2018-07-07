import React, { Component } from 'react'
import './ColorPicker.css'

class ColorInput extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.props.onColorInputChange(e)
  }

  render () {
    return (
          <input
            type='text'
            value={this.props.temp ? this.props.temp : this.props.color}
            onChange={this.handleChange}
          />
    )
  }
}

export default ColorInput
