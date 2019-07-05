import React from 'react'
import {Form, Input} from 'semantic-ui-react'
import {Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {addStock, editStock} from '../../actions/stocks'
const newStockUrl = 'http://localhost:3000/stocks'
const stockUrl = stockId => `http://localhost:3000/stocks/${stockId}`

class StockForm extends React.Component {
  state = {}
  fillingStockForm = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  addNewStock = e => {
    if (this.props.myStocks.filter(stock => stock.symbol === this.state.symbol.toUpperCase()).length > 0) {
      const stock = this
        .props
        .myStocks
        .find(stock => stock.symbol === this.state.symbol.toUpperCase())
      fetch(stockUrl(stock.id), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          "Authorized": `Bear ${localStorage.token}`
        },
          body: JSON.stringify({trade: 'buy', purchasePrice: this.state.purchasePrice, shares: this.state.shares})
        })
        .then(res => res.json())
        .then(data => {
          this
            .props
            .editStock(data.stock)
        })
    } else {
      fetch(newStockUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorized": `Bear ${localStorage.token}`
        },
        body: JSON.stringify({
          symbol: this.state.symbol.toUpperCase(),
          purchasePrice: this.state.purchasePrice,
          shares: this.state.shares,
          user_id: localStorage.user_id
        })
      })
      .then(res => res.json())
      .then(data => this.props.addStock(data.stock))
    }
    e.target.reset()
  }

  render() {
    return (
      <Form onSubmit={e => this.addNewStock(e)}>
        <Form.Group widths='equal'>
          <Form.Field>
            <label>Symbol</label>
            <Input
              fluid
              placeholder='Symbol'
              name='symbol'
              onChange={e => this.fillingStockForm(e)}/>
          </Form.Field>
          <Form.Field>
            <label>Purchased Price</label>
            <Input
              fluid
              placeholder='Price'
              name='purchasePrice'
              onChange={e => this.fillingStockForm(e)}/>
          </Form.Field>
          <Form.Field>
            <label>Amount of Shares</label>
            <Input
              fluid
              placeholder='Shares'
              name='shares'
              onChange={e => this.fillingStockForm(e)}/>
          </Form.Field>
        </Form.Group>
        <Button variant="success" type='submit'>Add Stock</Button>
      </Form>
    )
  }
}

export default connect(state => state.stocks, {addStock, editStock})(StockForm)