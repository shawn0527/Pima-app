import React from 'react'
import {Card, Button, Image} from 'semantic-ui-react'
import {Container, Form, Button as SButton, Input} from 'semantic-ui-react'
const stockInfoUrl = symbol => `https://cloud.iexapis.com/stable/stock/${symbol}/stats/?token=pk_8af4c42d6c704ca299d89a50a46e0628`
const price = symbol => `https://cloud.iexapis.com/stable/stock/${symbol}/price?token=pk_8af4c42d6c704ca299d89a50a46e0628`
const stockUrl = stockId => `http://localhost:3000/stocks/${stockId}`

class StockCard extends React.Component {
  state = {
    stock: {},
    marketPrice: null,
    editStock: false,
    buyStock: false
  }

  componentDidMount() {
    fetch(stockInfoUrl(this.props.stock.symbol), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {
        this.setState({stock: data})
      })
      .then(fetch(price(this.props.stock.symbol), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json()).then(data => {
        this.setState({marketPrice: data})
      }))
  }

  buyShares = () => {
    this.setState({
        editStock: !this.state.editStock,
        buyStock: true
    })
  }

  sellShares = () => {
      this.setState({
          editStock: !this.state.editStock,
          buyStock: false
      })
  }

  handleChange = e => {
      this.setState({
          [e.target.name]: e.target.value
      })
  }

  tradeStock = e => {
    //   debugger
      e.preventDefault()
      console.log(e.target.name)
      fetch(stockUrl(this.props.stock.id), {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            "Authorized": `Bear ${localStorage.token}`
        },
        body: JSON.stringify({
            trade: this.state.buyStock?'buy':'sell',
            purchasePrice:this.state.purchasePrice,
            shares: this.state.shares
        })
    })
    .then(res => res.json())
    .then(data => this.props.addStock(data.stock))
  }

  render() {
    const cashValue = this.state.marketPrice * this
      .props
      .stock
      .amount_of_shares
      .toFixed(2)
    const cost = this.props.stock.purchase_price * this
      .props
      .stock
      .amount_of_shares
      .toFixed(2)
    return (
      <Card>
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'/>
          <Card.Header>{this.state.stock.companyName}</Card.Header>
          <Card.Meta>{this.props.stock.symbol}</Card.Meta>
          <Card.Description>
            <li>PE Ratio: {this.state.stock.peRatio}</li>
            <li>Markt Cap: ${this.state.stock.marketcap}</li>
            <li>PE Ratio: {this.state.stock.peRatio}</li>
            <li>52 weeks Highest: {this.state.stock.week52high}</li>
            <li>52 weeks Lowest: {this.state.stock.week52low}</li>
            <li>Current price: {this.state.marketPrice}</li>
            <strong>Cash Value: ${cashValue}</strong>
            <br></br>
            <strong>Profit: ${cashValue - cost}</strong>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
            <Button basic color='green' onClick={this.buyShares}>Buy shares</Button>
            <Button basic color='red' onClick={this.sellShares}>Sell shares</Button>
          </div>
          </Card.Content>
          <Card.Content>
          {this.state.editStock
            ? <Form onSubmit={this.tradeStock}>
                <Form.Group widths='equal'>
                  <Form.Field>
                    <Input fluid placeholder='amount of shares' name='shares' onChange={this.handleChange}/>
                  </Form.Field>
                  <Form.Field>
                    <Input fluid placeholder='price' name='purchasePrice'/>
                  </Form.Field>
                  <Form.Field>
                    <SButton type='submit' onClick={this.tradeStock} name={this.state.buyStok?'buy':'sell'}>{this.state.buyStock?'Buy':'Sell'}</SButton>
                  </Form.Field>
                </Form.Group>
              </Form>
            : null}
          </Card.Content>
      </Card>
    )
  }
}

export default StockCard