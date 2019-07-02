import React from 'react'
import {Navbar, Nav} from 'react-bootstrap'

const NavBar = () => {
  return (
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand href="#home">Navbar</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/login">Login</Nav.Link>
        <Nav.Link onClick={() => localStorage.clear()} href='/'>Logout</Nav.Link>
      </Nav>
    </Navbar>
  )
}

export default NavBar