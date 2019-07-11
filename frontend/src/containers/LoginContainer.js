import React from 'react'
import {userLogin} from '../actions/users'
import {connect} from 'react-redux'
const url = 'http://localhost:3000/login'

class Login extends React.Component {

  state = {
    username: '',
    password: ''
  }

  componentWillMount() {
   return !!localStorage.token?this.props.history.push(`/${localStorage.username}`):null
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  login = e => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
        body: JSON.stringify({username: this.state.username, password: this.state.password})
      })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          this.props.userLogin(data)
          localStorage.setItem('user_id', `${data.user.id}`)
          localStorage.setItem('username', data.user.username)
          localStorage.setItem('token', data.jwt_token)
          window.location.reload()
        } else {
          this.props.history.push('/')
        }
      })
  }

  render() {
    document.body.setAttribute('class', 'login-page')
    return (
      <div class='login-box'>
        <h1>Welcome</h1>
        <div class='textbox'>
        <i class="fa fa-user" aria-hidden='true'/>
        <input type='text' placeholder='Username' name='username' onChange={e => this.handleChange(e)}/>
        </div>
        <div class='textbox'>
          <i class="fa fa-lock" aria-hidden='true'/>
          <input type='password' placeholder='Password' name='password' onChange={e => this.handleChange(e)}/>
        </div>
        <input class='btn' onClick={this.login} type='submit' value='Log In'/>
      </div>
    )
  }
}

export default connect(state => state.userData, {userLogin})(Login)