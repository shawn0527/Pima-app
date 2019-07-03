import React from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import {connect} from 'react-redux'

class NavBar extends React.Component {
  render() {
    console.log(this.props)
    if (this.props.username !== undefined) {
      return 'http://localhost:3001'
    } else {
      return (
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link to={`/${this.props.username}`}>Home</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link onClick={() => localStorage.clear()} href='/'>Logout</Nav.Link>
          </Nav>
        </Navbar>
      )
    }
  }
}

export default connect(state => state)(NavBar)