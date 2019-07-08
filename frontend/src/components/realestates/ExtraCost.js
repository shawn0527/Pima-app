import React from 'react'
import {Container, Form, Button, TextArea} from 'semantic-ui-react'
import Cost from './Cost'
const costUrl = 'http://localhost:3000/costs'
const accounting = require('accounting')
const realEstateUrl = id => `http://localhost:3000/realestates/${id}`

class Costs extends React.Component {
    state = {
        extraCost: {},
        allCosts: [],
        addExtraCost: false
    }

    handleECChange = e => {
    this.setState({
      extraCost: {
        ...this.state.extraCost,
        [e.target.name]: e.target.value
      }
    })  
  }

  addCost = e => {
      e.preventDefault()
      fetch(costUrl, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Authorized': `Bear ${localStorage.token}`
        },
        body: JSON.stringify({
          item_name: this.state.extraCost.item_name,
          cost: this.state.extraCost.cost,
          description: this.state.extraCost.description,
          real_estate_id: this.props.real_estate_id
        })
      })
      .then(res => res.json())
      .then(data => {
        this.setState({
            allCosts: [...this.state.allCosts, data],
            addExtraCost: false,
            总额: this.state.总额+data.cost
        })
      })
      e.target.reset()
    }

    addCostItem = () => {
          this.setState({
            addExtraCost: !this.state.addExtraCost
          })
        }

    componentDidMount() {
        fetch(costUrl, {
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorized': `Bear ${localStorage.token}`
            }
        })
        .then(res => res.json())
        .then(data => 
            this.setState({
                allCosts: data.filter(cost => cost.real_estate_id === this.props.real_estate_id)
            })
        )
        .then(fetch(realEstateUrl(this.props.real_estate_id), {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorized': `Bear ${localStorage.token}`
              }
            })
            .then(res => res.json())
            .then(data => {
              this.setState({
                总额: data
              })
            }))
    }

    render() {
        const costs = this.state.allCosts.map(cost => <Cost key={cost.id} cost={cost}/>)
        console.log(this.props)
        return (
            <ul>Other Cost: {accounting.formatMoney(this.state.总额)}
                {costs}
                <Container>
            <Button circular icon={this.state.addExtraCost?'minus':'plus'} color={this.state.addExtraCost?'red':'green'} onClick={this.addCostItem}/>
            {this.state.addExtraCost
            ? <Form onSubmit={this.addCost}>
                <Form.Group>
                  <Form.Input label='Cost Name' name='item_name' placeholder='Item' onChange={this.handleECChange}/>
                  <Form.Input label='Cost Amount' name='cost' placeholder='Cost' onChange={this.handleECChange}/>
                </Form.Group>
                <Form.Field id='form-textarea-control-opinion' control={TextArea} label='Description' name='description' placeholder='Description' onChange={this.handleECChange}/>
                <Form.Button content='Add'/>
              </Form>:null} 
          </Container> 
            </ul>
        )
        
    }
}

export default Costs