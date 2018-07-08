import React, { Component } from 'react'
import './App.css'

import Header from './components/Header'
import ColorPicker from './components/ColorPicker'
import {randomHue, randomPercent} from './colorUtilities.js'

class App extends Component {
  constructor (props) {
    super(props)

    this.addColor = this.addColor.bind(this)

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
  

  render () {
    return (
      <div className='App'>
        <Header numOfColors={this.state.colors.length} addColorHandler={this.addColor} />
        <div className='color-container'>
            {this.state.colors.map((color, i) => <ColorPicker key={i} hue={color.hue} saturation={color.saturation} luminance={color.luminance} />)}
        </div>
      </div>
    )
  }
}

export default App
