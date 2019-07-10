import React from 'react'
import {Form, Container, Button} from 'semantic-ui-react'
import {userLogin} from '../actions/users'
import {connect} from 'react-redux'
const url = 'http://localhost:3000/register'

class Register extends React.Component {

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
        username: this.state.username,
        password: this.state.password,
        password_confirmation: this.state.password_confirmation,
        firstname: this.state.firstname,
        middlename: this.state.middlename,
        lastname: this.state.lastname,
        email: this.state.email,
        mailing: this.state.mailing
      })
      })
      .then(res => res.json())
      .then(data => {
        this.props.userLogin(data)
        return this.props.history.push(`/users/${data.user.username}`)
    })
  }

  render() {
    return (
      <div class='register-page'>
      <Container>
        <Form onSubmit={e => this.register(e)}>
          <Form.Group unstackable widths={2}>
            <Form.Input label='Username' placeholder='Username' name='username' onChange={(e) => this.handleChange(e)}/>
            <Form.Input label='Password' type='password' placeholder='Password' name='password' onChange={(e) => this.handleChange(e)}/>
            <Form.Input label='Password Confirmation' type='password' placeholder='Re-enter Password' name='password_confirmation' onChange={(e) => this.handleChange(e)}/>
          </Form.Group>
          <Form.Group unstackable widths={2}>
            <Form.Input label='First name' name='firstname' placeholder='First name' onChange={(e) => this.handleChange(e)}/>
            <Form.Input label='Middle name' name='middlename' placeholder='Middle name' onChange={(e) => this.handleChange(e)}/>
            <Form.Input label='Last name' name='lastname' placeholder='Last name' onChange={(e) => this.handleChange(e)}/>
          </Form.Group>
          <Form.Group widths={2}>
            <Form.Input label='Email Address' name='email' placeholder='Email Address' onChange={(e) => this.handleChange(e)}/>
            <Form.Input label='Re-enter Email' placeholder='Email Address'/>
          </Form.Group>
          <Form.Group widths={2}>
            <Form.Input
              label='Mailing Address'
              name='mailing'
              placeholder='Mailing Address' onChange={(e) => this.handleChange(e)}/>
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
      </div>
    )
  }
}

export default connect(state => state.userData, {userLogin})(Register)