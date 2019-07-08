import React from 'react'
import {Form, List, Button, Input} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {sellRealEstate} from '../../actions/realEstates'
import Costs from '../realestates/ExtraCost'
const accounting = require('accounting')
const realEstateUrl = id => `http://localhost:3000/realestates/${id}`

class RealEstateCard extends React.Component {
  state = {
      realEstate: this.props.realEstate !== undefined?this.props.realEstate:{},
      edit: false,
      sell: false
  }

  edit = () => {
    this.setState({
      edit: !this.state.edit
    })
  }

  sell = () => {
      this.setState({
          sell: !this.state.sell
      })
  }

  handleREChange = e => {
      this.setState({
          realEstate:{
            ...this.state.realEstate,
            [e.target.name]: e.target.value
          }
      })
  }

  updateProperty = e => {
    e.preventDefault()
    if(this.state.sell) {
        fetch(realEstateUrl(this.state.realEstate.id), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorized': `Bear ${localStorage.token}`
            },
            body: JSON.stringify({
                id: this.state.realEstate.id
            })
        })
        .then(this.props.sellRealEstate(this.state.realEstate.id))
    } else if(!this.state.edit) {
        return fetch(realEstateUrl(this.state.realEstate.id), {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorized': `Bear ${localStorage.token}`
            },
            body: JSON.stringify(this.state.realEstate)
        })
    }

    
  }

  render() {
    let name, rent, insurance, tax, cost, address, netIncome, roi
    name = this.state.realEstate.name
    rent = this.state.realEstate.rent
    insurance = this.state.realEstate.insurance
    tax = this.state.realEstate.tax
    cost = this.state.realEstate.cost
    address = this.state.realEstate.address
    netIncome = rent * 12 - insurance - tax
    roi = (cost/netIncome).toFixed(2)
    return (
      <div>card{this.props.realEstate !== undefined
        ? <List>
            <List.Item>
              <List.Icon name='marker'/>
              <List.Content>
                <Form onSubmit={this.updateProperty}>
                  <List.Header as='a' size='large'>{this.state.edit
                      ? <Input size='mini' placeholder={`${name}`} name='name' onChange={this.handleREChange}/> 
                      : name}
                  </List.Header>
                  <h3>Address: {this.state.edit
                      ? <Input size='mini' placeholder={`${address}`} name='address' onChange={this.handleREChange}/>
                      : address}<br></br>
                  </h3>
                  <ul>Rent: {this.state.edit
                      ? <Input size='mini' placeholder={`${accounting.formatMoney(rent)}`} name='rent' onChange={this.handleREChange}/>
                      : accounting.formatMoney(rent)}/month</ul>
                  <ul>Insurance: {this.state.edit
                      ? <Input size='mini' placeholder={`${accounting.formatMoney(insurance)}`} name='insurance' onChange={this.handleREChange}/>
                      : accounting.formatMoney(insurance)}/year</ul>
                  <ul>Tax: {this.state.edit
                      ? <Input size='mini' placeholder={`${accounting.formatMoney(tax)}`} name='tax' onChange={this.handleREChange}/>
                      : accounting.formatMoney(tax)}/year</ul>
                  <ul><Costs real_estate_id={this.state.realEstate.id}/></ul>
                  <ul>Acquisition Cost: {this.state.edit
                      ? <Input size='mini' placeholder={`${accounting.formatMoney(cost)}`} name='cost' onChange={this.handleREChange}/>
                      : accounting.formatMoney(cost)}</ul>
                  <strong>Annual Net Income: {accounting.formatMoney(netIncome)}</strong><br></br>
                  <strong>ROI: {roi}%</strong><br></br>                   
                  <Button.Group>
                    <Button positive onClick={this.edit}>{this.state.edit?'Save':'Edit'}</Button>
                    <Button.Or/>
                    <Button onClick={this.sell}>Sold</Button>
                  </Button.Group>
                </Form>
                </List.Content>
            </List.Item>
          </List>
          : null}
      </div>
    )
  }
}

export default connect(state => state.realEstates, {sellRealEstate})(RealEstateCard)