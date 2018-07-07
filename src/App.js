import React, { Component } from 'react'
import './App.css'

import Header from './components/Header'
import ColorPicker from './components/ColorPicker'
import {randomHue, randomPercent} from './colorUtilities.js'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Header />
        <div className='color-container'>
          <ColorPicker hue={randomHue()} saturation={randomPercent()} luminance={randomPercent()} />
          <ColorPicker hue={randomHue()} saturation={randomPercent()} luminance={randomPercent()} />
          <ColorPicker hue={randomHue()} saturation={randomPercent()} luminance={randomPercent()} />
          <ColorPicker hue={randomHue()} saturation={randomPercent()} luminance={randomPercent()} />
          <ColorPicker hue={randomHue()} saturation={randomPercent()} luminance={randomPercent()} />
        </div>
      </div>
    )
  }
}

export default App
