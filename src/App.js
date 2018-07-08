import React, { Component } from 'react'
import './App.css'

import Header from './components/Header'
import ColorPicker from './components/ColorPicker'
import {randomHue, randomPercent} from './colorUtilities.js'

class App extends Component {
  constructor (props) {
    super(props)

    this.addColor = this.addColor.bind(this)
    this.removeColor = this.removeColor.bind(this)
    this.handleHueChange = this.handleHueChange.bind(this)
    this.handleSaturationChange = this.handleSaturationChange.bind(this)
    this.handleLuminanceChange = this.handleLuminanceChange.bind(this)
    this.setHslState = this.setHslState.bind(this)

    this.state = {
      colors:   [  
          {
              hue: randomHue(),
              saturation: randomPercent(),
              luminance: randomPercent(),
          },
          {
              hue: randomHue(),
              saturation: randomPercent(),
              luminance: randomPercent(),
          },
          {
              hue: randomHue(),
              saturation: randomPercent(),
              luminance: randomPercent(),
          },
      ]
    }
  }

  addColor(){
      if(this.state.colors.length < 7){
          this.setState(prevState => ({
            colors: [...prevState.colors, {
                  hue: randomHue(),
                  saturation: randomPercent(),
                  luminance: randomPercent(),
              }] 
          }));
      }
  }
  removeColor(index) {
    let colors = [...this.state.colors]
    colors.splice(index, 1)
    this.setState({ colors })      
  }
  setHslState (color, index) {
    let res = /hsl\(\s*(\d{1,3})\s*,\s*(\d+(?:\.\d+)?)%\s*,\s*(\d+(?:\.\d+)?)%\)/g.exec(color).slice(1)
    let colors = [...this.state.colors]
    colors[index].hue = res[0]
    colors[index].saturation = res[1]
    colors[index].luminance = res[2]
    this.setState({ colors })      
  }
  handleHueChange (event, index) {
    let colors = [...this.state.colors]
    colors[index].hue = event.target.value
    this.setState({ colors })
  }
  handleSaturationChange (event, index) {
    let colors = [...this.state.colors]
    colors[index].saturation = event.target.value
    this.setState({ colors })
  }
  handleLuminanceChange (event, index) {
    let colors = [...this.state.colors]
    colors[index].luminance = event.target.value
    this.setState({ colors })
  }

  render () {
    return (
      <div className='App'>
        <Header numOfColors={this.state.colors.length} addColorHandler={this.addColor} />
        <div className='color-container'>
            {this.state.colors.map((color, i) => (
                <ColorPicker 
                    key={i} 
                    index={i} 
                    hue={color.hue} saturation={color.saturation} luminance={color.luminance} 
                    removeColor={this.removeColor}
                    onHueChange={this.handleHueChange}
                    onSaturationChange={this.handleSaturationChange}
                    onLuminanceChange={this.handleLuminanceChange}
                    setHslState={this.setHslState}
                />
            ))}
        </div>
      </div>
    )
  }
}

export default App
