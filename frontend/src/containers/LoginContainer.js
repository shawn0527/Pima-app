import React from 'react'
import {Button, Form, Segment, Container} from 'semantic-ui-react'

class Login extends React.Component {
  render() {
    return (
      <Container>
        <Segment inverted>
          <Form inverted>
            <Form.Group widths='equal'>
              <Form.Input fluid label='Username' placeholder='Username'/>
              <Form.Input fluid label='Password' placeholder='Password'/>
            </Form.Group>
            <Button onClick={() => this.props.history.push('/user')} type='submit'>Login</Button>
          </Form>
        </Segment>
        <button onClick={() => this.props.history.push('/user')}>Login</button>
        <button onClick={() => this.props.history.push('/register')}>Open an account</button>
      </Container>
    )
  }
}

export default Login