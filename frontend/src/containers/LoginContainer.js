import React from 'react'
import {Button, Form, Segment, Container} from 'semantic-ui-react'
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
        user:{
          username: this.state.username,
          password: this.state.password
        }
      })
    })
    .then(res => res.json())
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
        <button onClick={() => this.props.history.push('/user')}>Login</button>
        <button onClick={() => this.props.history.push('/register')}>Open an account</button>
      </Container>
    )
  }
}

export default Login