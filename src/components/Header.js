import React, { Component } from 'react'
import './Header.css'

class Header extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  render () {
    return (
      <header>
        <h1>hunicorn</h1>
        <ul>
          <li><a href='#'>create</a></li>
          <li><a href='#'>explore</a></li>
        </ul>
      </header>
    )
  }
}

export default Header
