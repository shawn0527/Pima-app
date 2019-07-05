import React from 'react'
import {Container, Form, Button, TextArea} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {addRealEstate} from '../../actions/realEstates'
const newProperty = 'http://localhost:3000/realestates'
const locationUrl = address => `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyDbTzDkksixhTeQ6RTcsuivx8TtQfR2nkE`

class RealEstateForm extends React.Component {

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  addNewProperty = e => {
    e.preventDefault()
      fetch(newProperty, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorized": `Bear ${localStorage.token}`
        }, 
          body: JSON.stringify({
            ...this.state,
            user_id: localStorage.user_id
          })
        })
        .then(res => res.json())
        .then(data => {
          this.props.addRealEstate(data)
        })
        e.target.reset()
  }

  render() {
    return (
      <Container>
        <Form onSubmit={this.addNewProperty}>
          <Form.Group widths={2}>
            <Form.Input label='Property Name' name='name' placeholder='Property Name' onChange={(e) => this.handleChange(e)}/>
            <Form.Input label='Address' name='address' placeholder='Address' onChange={(e) => this.handleChange(e)}/>
          </Form.Group>
          <Form.Group widths={2}>
            <Form.Input label='Rent' name='rent' placeholder='Rent/month' onChange={(e) => this.handleChange(e)}/>
            <Form.Input label='Insurance' name='insurance' placeholder='Insurance' onChange={(e) => this.handleChange(e)}/>
            <Form.Input label='Tax' name='tax' placeholder='Tax' onChange={(e) => this.handleChange(e)}/>
            <Form.Input label='Cost' name='cost' placeholder='Purchased Cost' onChange={(e) => this.handleChange(e)}/>
          </Form.Group>
          <Form.Field id='form-textarea-control-opinion' control={TextArea} label='Description' name='description' placeholder='Description' onChange={(e) => this.handleChange(e)}/>
          <Button positive>Add Property</Button>
        </Form>
      </Container>
    )
  }
}

export default connect(null, {addRealEstate})(RealEstateForm)