import React, { Component } from 'react'
import './App.css'

import Header from './components/Header'
import Toolbar from './components/Toolbar'
import ColorPicker from './components/ColorPicker'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Header />
        <Toolbar />
        <div className='color-container'>
          <ColorPicker hue={180} saturation={50} luminance={50} />
          <ColorPicker hue={180} saturation={50} luminance={50} />
          <ColorPicker hue={180} saturation={50} luminance={50} />
          <ColorPicker hue={180} saturation={50} luminance={50} />
          <ColorPicker hue={180} saturation={50} luminance={50} />
        </div>
      </div>
    )
  }
}

export default App
