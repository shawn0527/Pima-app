import React from 'react'
import {Form, Container, Button} from 'semantic-ui-react'
const url = 'http://localhost:3000/register'

class Register extends React.Component {

  state = {
    username: '',
    password: '',
    password_confirmation: ''
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  register = e => {
    e.preventDefault()
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          username: this.state.username,
          password: this.state.password,
          password_confirmation: this.state.password_confirmation
        }
      })
    })
  }

  render() {
    return (
      <Container>
        <Form onSubmit={e => this.register(e)}>
          <Form.Group unstackable widths={2}>
            <Form.Input
              label='Username'
              placeholder='Username'
              name='username'
              onChange={(e) => this.handleChange(e)}/>
            <Form.Input
              label='Password'
              type='password'
              placeholder='Password'
              name='password'
              onChange={(e) => this.handleChange(e)}/>
            <Form.Input
              label='Password Confirmation'
              type='password'
              placeholder='Re-enter Password'
              name='password_confirmation'
              onChange={(e) => this.handleChange(e)}/>
          </Form.Group>
          <Form.Group unstackable widths={2}>
            <Form.Input label='First name' placeholder='First name'/>
            <Form.Input label='Middle name' placeholder='Middle name'/>
            <Form.Input label='Last name' placeholder='Last name'/>
          </Form.Group>
          <Form.Group widths={2}>
            <Form.Input label='Email Address' placeholder='Email Address'/>
            <Form.Input label='Re-enter Email' placeholder='Email Address'/>
          </Form.Group>
          <Form.Group widths={2}>
            <Form.Input label='Mailing Address' placeholder='Mailing Address'/>
            <Form.Input label='Mailing Address 2' placeholder='(option)'/>
          </Form.Group>
          <Form.Group widths={2}>
            <Form.Input label='City' placeholder='City'/>
            <Form.Input label='State' placeholder='State'/>
            <Form.Input label='Country' placeholder='Country'/>
            <Form.Input label='Zip Code' placeholder='Zip Code'/>
          </Form.Group>
          <Form.Checkbox label='I agree to the Terms and Conditions'/>
          <Button type='submit'>Submit</Button>
        </Form>
      </Container>
    )
  }
}

export default Register