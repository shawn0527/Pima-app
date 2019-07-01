import React from 'react'
import {Button, Form, Segment, Container} from 'semantic-ui-react'
import {userLogin} from '../actions/users'
import {connect} from 'react-redux'
const url = 'http://localhost:3000/login'

class Login extends React.Component {

  state={
    username: '',
    password: ''
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

 login = (e) => {
    e.preventDefault()
    fetch(url,{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
      })
    })
    .then(res => res.json())
    .then(data => {
      if(data.user) {
        this.props.userLogin(data)
        this.props.history.push(`/${data.user.username}`)
      } else {
        this.props.history.push('/')
      }
    }
      
    )
  }

  render() {
    return (
      <Container>
        <Segment inverted>
          <Form inverted onSubmit={(e) => this.login(e)}>
            <Form.Group widths='equal'>
              <Form.Input fluid label='Username' placeholder='Username' name='username' onChange={e => this.handleChange(e)}/>
              <Form.Input fluid label='Password' type='password' placeholder='Password' name='password' onChange={e => this.handleChange(e)}/>
            </Form.Group>
            <Button type='submit'>Login</Button>
          </Form>
        </Segment>
        <button onClick={() => this.props.history.push('/login')}>Login</button>
        <button onClick={() => this.props.history.push('/register')}>Open an account</button>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    userData: state.userData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    userLogin: (userData) => dispatch(userLogin(userData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)