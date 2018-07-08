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
    this.handleLockChange = this.handleLockChange.bind(this)
    this.setHslState = this.setHslState.bind(this)
    this.randomColors = this.randomColors.bind(this)
    this.handleSave = this.handleSave.bind(this)

    this.state = {
      colors:   [  
          {
              hue: randomHue(),
              saturation: randomPercent(),
              luminance: randomPercent(),
              locked: false,
          },
          {
              hue: randomHue(),
              saturation: randomPercent(),
              luminance: randomPercent(),
              locked: false,
          },
          {
              hue: randomHue(),
              saturation: randomPercent(),
              luminance: randomPercent(),
              locked: false,
          },
          {
              hue: randomHue(),
              saturation: randomPercent(),
              luminance: randomPercent(),
              locked: false,
          },
      ]
    }
  }
  componentDidMount(){
      this.loadFromUrl()
  }
  loadFromUrl(){
      if(window.location.pathname !== '/'){
            let colors = window.location.pathname
            colors = colors.split('/')
            colors.splice(0,1)
            colors = colors.map(color => encodeURIComponent(color))
            colors = colors.map(color => color.split('-'))
            colors = colors.map(color => color = {hue: color[0], saturation: color[1], luminance: color[2], locked: false})
            this.setState({ colors })      
        }
  }
  addColor(){
      if(this.state.colors.length < 7){
          this.setState(prevState => ({
            colors: [...prevState.colors, {
                  hue: randomHue(),
                  saturation: randomPercent(),
                  luminance: randomPercent(),
                  locked: false,
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
  handleLockChange (index) {
    let colors = [...this.state.colors]
    colors[index].locked = !colors[index].locked
    this.setState({ colors })
  }
  randomColors (event, index) {
    let colors = [...this.state.colors]

    for(let i = 0; i < colors.length; i++){
        if(colors[i].locked === false){
            colors[i].hue = randomHue()
            colors[i].saturation = randomPercent()
            colors[i].luminance = randomPercent()
        }
    }

    this.setState({ colors })
  }

   handleSave(colorsArray){
       let url = '';
       this.state.colors.map((color) => url += '/' +  color.hue + '-' + color.saturation + '-' + color.luminance)
       window.history.pushState(this.state.colors, 'palette', url)
   }

  render () {
    return (
      <div className='App'>
        <Header numOfColors={this.state.colors.length} addColorHandler={this.addColor} randomHandler={this.randomColors} handleSave={this.handleSave} />
        <div className='color-container'>
            {this.state.colors.map((color, i) => (
                <ColorPicker 
                    key={i} 
                    index={i} 
                    locked={color.locked}
                    hue={color.hue} saturation={color.saturation} luminance={color.luminance} 
                    removeColor={this.removeColor}
                    onHueChange={this.handleHueChange}
                    onSaturationChange={this.handleSaturationChange}
                    onLuminanceChange={this.handleLuminanceChange}
                    onLockChange={this.handleLockChange}
                    setHslState={this.setHslState}
                />
            ))}
        </div>
      </div>
    )
  }
}

export default App
