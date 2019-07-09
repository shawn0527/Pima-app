import React from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import {connect} from 'react-redux'

class NavBar extends React.Component {
  render() {
      return (
        <div class='headers'>
          <h2 class='logo'>DarkCode</h2>
          <input type='checkbox' id='chk' />
          <label for='chk' class='show-menu-btn'>
            <i class='fas fa-ellipsis-h'></i>
          </label>

          <ul class='menu'>
            <a href={`/${localStorage.username}`}>Home</a>
            {!!localStorage.token?<a href={`/${localStorage.username}/stocks`}>Stock</a>:null}
            {!!localStorage.token?<a href={`/${localStorage.username}/realestates`}>Real Estate</a>:null}
            {!!localStorage.token?<a href='/' onClick={() => localStorage.clear()}>Logout</a>:<a href="/login">Login</a>}
            <label for='chk' class='hide-menu-btn'>
              <i class='fas fa-times'></i>
            </label>
          </ul>
        </div>

      
        
        // <Navbar bg="primary" variant="dark">
        //   <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        //   <Nav className="mr-auto">
        //     <Nav.Link href={`/${localStorage.username}`}>Home</Nav.Link>
        //     {!!localStorage.token?<Nav.Link onClick={() => localStorage.clear()} href='/'>Logout</Nav.Link>:<Nav.Link href="/login">Login</Nav.Link>}
        //   </Nav>
        // </Navbar>
      )
  }
}

export default connect(state => state)(NavBar)