import React from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'

class HomePage extends React.Component {
  componentWillMount() {
    if (localStorage.token === undefined) {
      this.props.history.push('/')
    }
  }

  componentDidMount() {
    if (localStorage.token === undefined) {
      this.props.history.push('/')
    } else {
      fetch(`http://localhost:3000/users/${localStorage.username}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorized": `Bear ${localStorage.token}`
          }
        })
        .then(res => res.json())
    }
  }

  render() {
    return (
      <div>
        HomePage
        <h1>{this.props.userData.user !== undefined?this.props.userData.user.firstname:null}</h1>
        <p>table</p>
        <p>chart</p>
        <p>total amount</p>
        <p>CPI</p>
        <NavLink to={localStorage.username !== undefined?`/${localStorage.username}/stocks`:'/'}>Stock</NavLink>
        <br></br>
        <NavLink to={localStorage.username !== undefined?`/${localStorage.username}/realestates`:'/'}>RealEstate</NavLink>
        <br></br>
        <NavLink to='/:username/investments'>Investment</NavLink>
      </div>
    )
  }
}

export default connect(state => state)(HomePage)