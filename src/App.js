import React, { Component } from 'react'
import './App.css'

import ColorPicker from './ColorPicker'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1 className='App-title'>Palette Picker</h1>
        </header>
        <div className='color-container'>
          <ColorPicker />
          <ColorPicker />
          <ColorPicker />
          <ColorPicker />
          <ColorPicker />
        </div>
      </div>
    )
  }
}

export default App
