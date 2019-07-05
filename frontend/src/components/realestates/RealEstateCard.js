import React from 'react'
import {Form, List, Button, Input} from 'semantic-ui-react'
import Finance from 'financejs'
const finance = new Finance()
const realEstateUrl = id => `http://localhost:3000/realestates/${id}`

class RealEstateCard extends React.Component {
  state = {
      realEstate: this.props.realEstate !== undefined?this.props.realEstate:{},
      edit: false
  }

  edit = () => {
    this.setState({
      edit: !this.state.edit
    })
  }

  handleChange = e => {
      this.setState({
          realEstate:{
            ...this.state.realEstate,
            [e.target.name]: e.target.value
          }
      })
  }

  updateProperty = e => {
    e.preventDefault()
    fetch(realEstateUrl(this.props.realEstate.id), {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorized': `Bear ${localStorage.token}`
        },
        body: JSON.stringify(this.state.realEstate)
    }).catch(err => console.log(err))
  }

  render() {
    let name, rent, insurance, tax, cost, netIncome
    name = this.state.realEstate.name
    rent = this.state.realEstate.rent
    insurance = this.state.realEstate.insurance
    tax = this.state.realEstate.tax
    cost = this.state.realEstate.cost
    netIncome = rent * 12 - insurance - tax
    return (
      <div>RealEstateCard {this.props.realEstate !== undefined
          ? <List>
              <List.Item>
                <List.Icon name='marker'/>
                <List.Content>
                <Form onSubmit={this.updateProperty}>
                  <List.Header as='a'>{this.state.edit
                      ? <Input size='mini' placeholder={`${name}`} name='name' onChange={this.handleChange}/> 
                      : name}</List.Header>
                  <ul>Rent: ${this.state.edit
                      ? <Input size='mini' placeholder={`${rent}`} name='rent' onChange={this.handleChange}/>
                      : rent}/month</ul>
                  <ul>Insurance: ${this.state.edit
                      ? <Input size='mini' placeholder={`${insurance}`} name='insurance' onChange={this.handleChange}/>
                      : insurance}/year</ul>
                  <ul>Tax: ${this.state.edit
                      ? <Input size='mini' placeholder={`${tax}`} name='tax' onChange={this.handleChange}/>
                      : tax}/year</ul>
                  <ul>Cost: ${this.state.edit
                      ? <Input size='mini' placeholder={`${cost}`} name='cost' onChange={this.handleChange}/>
                      : cost}/year</ul>
                       <strong>Annual Net Income: ${netIncome}/ROI: {finance.ROI(-cost, cost+netIncome)}%</strong>
                  <List.Description>
                    {this.props.realEstate.address}
                    <Button.Group>
                      <Button positive onClick={this.edit}>{this.state.edit
                          ? 'Save'
                          : 'Edit'}</Button>
                      <Button.Or/>
                      <Button>Sold</Button>
                    </Button.Group>
                  </List.Description>
                  </Form>
                </List.Content>
              </List.Item>
            </List>
          : null}
      </div>
    )
  }
}

export default RealEstateCard