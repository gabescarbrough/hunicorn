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
        <ColorPicker />
      </div>
    )
  }
}

export default App
