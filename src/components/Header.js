import React, { Component } from 'react'
import './Header.css'

class Header extends Component {
  constructor (props) {
    super(props)
    this.randomHandler = this.randomHandler.bind(this)
    this.addColorHandler = this.addColorHandler.bind(this)
  }

  randomHandler() {
    this.props.randomHandler()
  }

  addColorHandler() {
    this.props.addColorHandler()
  }

  render () {
    const addIsDisabled = this.props.numOfColors >= 7;
    return (
      <header>
        <h1>hunicorn</h1>
        <button onClick={this.props.randomHandler}>Random</button>
        <button disabled={addIsDisabled} onClick={this.props.addColorHandler}>Add Color</button>
      </header>
    )
  }
}

export default Header
