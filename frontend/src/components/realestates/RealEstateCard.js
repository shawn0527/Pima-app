import React from 'react'
import {Form, List, Button, Input, Segment, Grid, Divider} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {sellRealEstate} from '../../actions/realEstates'
import Costs from '../realestates/ExtraCost'
import {Bar} from 'react-chartjs-2'
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
            }
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
    let name, rent, insurance, tax, cost, address, netIncome, roi, monthlyCashflow
    name = this.state.realEstate.name
    rent = this.state.realEstate.rent
    insurance = this.state.realEstate.insurance
    tax = this.state.realEstate.tax
    cost = this.state.realEstate.cost
    address = this.state.realEstate.address
    netIncome = rent * 12 - insurance - tax - this.state.realEstate.total
    monthlyCashflow = netIncome/12
    roi = (netIncome/cost*100).toFixed(2)
    const data = {
      labels: ['Unit: $1000 for AC, $1 for MCF, 0.01% for ROI'],
      datasets: [{
        label: 'Aqusition Cost',
        backgroundColor: 'rgb(255, 99, 123)',
        borderColor: 'rgb(255, 99, 123)',
        data: [-cost/1000]
      },
      {
        label: 'Monthly CashFlow',
        backgroundColor: 'rgb(154, 205, 50)',
        borderColor: 'rgb(154, 205, 50)',
        data: [monthlyCashflow] 
      },
      {
        label: 'ROI',
        backgroundColor: 'rgb(0,191,255)',
        borderColor: 'rgb(0,191,255)',
        data: [roi*100] 
      }
    ]
    }
    return (
      <Segment>
        <Grid columns={2} relaxed='very'>
          <Grid.Column>
          {this.props.realEstate !== undefined
        ? <List>
            <List.Item>
              <List.Icon name='marker'/>
              <List.Content>
                <Form onSubmit={this.updateProperty}>
                  <h2 color='red' size='mini'>{this.state.edit
                      ? <Input size='mini' placeholder={`${name}`} name='name' onChange={this.handleREChange}/> 
                      : name}
                  </h2>
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
                  <List as='ol'>
                    <Costs real_estate_id={this.state.realEstate.id}/>
                  </List>
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
          </Grid.Column>
          <Grid.Column>
            <Bar data={data} width={100} height={50} />
          </Grid.Column>
        </Grid>
        <Divider vertical>=></Divider>
      </Segment>
    )
  }
}

export default connect(state => state.realEstates, {sellRealEstate})(RealEstateCard)