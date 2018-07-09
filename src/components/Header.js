import React, { Component } from 'react'
import './Header.css'

class Header extends Component {
  constructor (props) {
    super(props)
    this.randomHandler = this.randomHandler.bind(this)
    this.addColorHandler = this.addColorHandler.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  randomHandler() {
    this.props.randomHandler()
  }

  addColorHandler() {
    this.props.addColorHandler()
  }
    
  handleSave() {
    this.props.handleSave()
  }

  render () {
    const addIsDisabled = this.props.numOfColors >= 7;
    return (
      <header>
        <h1>hunicorn</h1>
        <div className='buttons'>
            <button onClick={this.props.randomHandler}>Random</button>
            <button disabled={addIsDisabled} onClick={this.props.addColorHandler}>Add Color</button>
            <button onClick={this.props.handleSave}>Save</button>
        </div>
      </header>
    )
  }
}

export default Header
