import React from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import {connect} from 'react-redux'

class NavBar extends React.Component {
  render() {
      return (
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href={`/${localStorage.username}`}>Home</Nav.Link>
            {!!localStorage.token?<Nav.Link onClick={() => localStorage.clear()} href='/'>Logout</Nav.Link>:<Nav.Link href="/login">Login</Nav.Link>}
          </Nav>
        </Navbar>
      )
  }
}

export default connect(state => state)(NavBar)