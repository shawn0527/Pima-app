import React from 'react'
import {Header, Modal, Form, Button, TextArea} from 'semantic-ui-react'
import Cost from './Cost'
import {connect} from 'react-redux'
import {totalCost, deleteCost} from '../../actions/realEstates'
// import Loading from '../Loading'
const costUrl = 'http://localhost:3000/costs'
const deleteCostUrl = id => `http://localhost:3000/costs/${id}`
const accounting = require('accounting')
const realEstateUrl = id => `http://localhost:3000/realestates/${id}`

class Costs extends React.Component {
  state = {
    extraCost: {},
    allCosts: [],
    total:0,
    detail: false
  }

  showDetail =() => {
    this.setState({
      detail: !this.state.detail
    })
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
        body: JSON.stringify({item_name: this.state.extraCost.item_name, cost: this.state.extraCost.cost, description: this.state.extraCost.description, real_estate_id: this.props.real_estate_id})
      })
      .then(res => res.json())
      .then(data => {
        this.props.totalCost(this.props.real_estate_id ,this.state.total+data.cost)
        this.setState({
          allCosts: [
            ...this.state.allCosts,
            data
          ],
          total: this.state.total + data.cost
        })
      })
    e.target.reset()
  }

  deleteCost = id => {
    fetch(deleteCostUrl(id), {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'Authorized': `Bear ${localStorage.token}`
      }
    })
    .then(() => {
      let deletedCost = this.state.allCosts.find(cost => cost.id === id)
      let newTotal = this.state.total - deletedCost.cost
      this.props.deleteCost(deletedCost.real_estate_id, deletedCost.cost)
      this.setState({
      allCosts: this.state.allCosts.filter(cost => cost.id !== id),
      total: newTotal
    })
  })
  }

  componentDidMount() {
    fetch(costUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorized': `Bear ${localStorage.token}`
        }
      })
      .then(res => res.json())
      .then(data => this.setState({
        allCosts: data.filter(cost => cost.real_estate_id === this.props.real_estate_id)
      }))
      .then(fetch(realEstateUrl(this.props.real_estate_id), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorized': `Bear ${localStorage.token}`
        }
      }).then(res => res.json()).then(data => {
        this.props.totalCost(this.props.real_estate_id ,data)
        this.setState({total: data})
      }))
  }

  render() {
    const costs = this.state.allCosts.map(cost => <Cost deleteCost={this.deleteCost} key={cost.id} cost={cost}/>)
    return (
      <ul><strong>Other Cost: {accounting.formatMoney(this.state.total)}</strong><Button circular primary onClick={this.showDetail}>Details</Button>
        {this.state.detail?costs:null}
        <Modal style={{position: 'absolute',top: '36%',left: '30%'}} trigger={<Button circular primary>add cost</Button>} closeIcon basic size='small'>
            <Header icon='dollar' content='Add Cost'/>
            <Modal.Content>
              <Form onSubmit={this.addCost}>
                <Form.Group>
                  <Form.Input label='Cost Name' name='item_name' placeholder='Item' onChange={this.handleECChange}/>
                  <Form.Input label='Cost Amount' name='cost' placeholder='Cost' onChange={this.handleECChange}/>
                </Form.Group>
                <Form.Field id='form-textarea-control-opinion' control={TextArea} label='Description' name='description' placeholder='Description' onChange={this.handleECChange}/>
                <Form.Button primary content='Add'/>
              </Form>
            </Modal.Content>
        </Modal>
      </ul>
    )
  }
}

export default connect(null, {totalCost, deleteCost})(Costs)