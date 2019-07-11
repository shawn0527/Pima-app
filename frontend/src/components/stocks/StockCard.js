import React from 'react'
import { Segment, Grid, Form, Input, Card, Button, Image, List } from 'semantic-ui-react'
import {connect} from 'react-redux'
import {editStock} from '../../actions/stocks'
import Loading from '../Loading'
var accounting = require('accounting')
const stockInfoUrl = symbol => `https://cloud.iexapis.com/stable/stock/${symbol}/stats/?token=pk_8af4c42d6c704ca299d89a50a46e0628`
const price = symbol => `https://cloud.iexapis.com/stable/stock/${symbol}/price?token=pk_8af4c42d6c704ca299d89a50a46e0628`
const stockUrl = stockId => `http://localhost:3000/stocks/${stockId}`
const stockLogo = symbol => `https://cloud.iexapis.com/stable/stock/${symbol}/logo?token=pk_8af4c42d6c704ca299d89a50a46e0628`
const stockNews = symbol => `https://cloud.iexapis.com/stable/stock/${symbol}/news/last/5?token=pk_8af4c42d6c704ca299d89a50a46e0628`

class StockCard extends React.Component {
  state = {
    stock: {},
    news: [],
    marketPrice: null,
    editStock: false,
    buyStock: false,
    isLoading: true
  }

  componentWillMount() {
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
        fetch(stockUrl(this.props.stock.id), {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            "Authorized": `Bear ${localStorage.token}`
          },
            body: JSON.stringify({market_price: data})
        })
        this.setState({marketPrice: data})
      }))
      .then(fetch(stockLogo(this.props.stock.symbol), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json()).then(data => {
        this.setState({
          stock: {
            ...this.state.stock,
            logo: data.url
          }
        })
      }))
      .then(fetch(stockNews(this.props.stock.symbol), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json()).then(data => {
        this.setState({news: data, isLoading: false})
      }))
  }

  componentDidMount() {
    fetch(stockUrl(this.props.stock.id), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "Authorized": `Bear ${localStorage.token}`
      },
        body: JSON.stringify({market_price: this.state.marketPrice})
    })
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
    e.preventDefault()
    this.setState({editStock: false})
    fetch(stockUrl(this.props.stock.id), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "Authorized": `Bear ${localStorage.token}`
      },
        body: JSON.stringify({
          trade: this.state.buyStock
            ? 'buy'
            : 'sell',
          purchasePrice: this.state.purchasePrice,
          shares: this.state.shares
        })
      })
      .then(res => res.json())
      .then(data => {
        this.props.editStock(data.stock)
      })
    e.target.reset()
  }

  render() {
    const cashValue = this.state.marketPrice * this.props.stock.amount_of_shares.toFixed(2)
    const cost = this.props.stock.purchase_price * this.props.stock.amount_of_shares.toFixed(2)
    return (this.state.isLoading?<Loading/>
      :<Segment>
        <Grid columns={2} relaxed='very'>
          <Grid.Column>
            <Card>
              <Card.Content>
                <Image floated='right' size='mini' src={this.state.stock.logo}/>
                <Card.Header>{this.state.stock.companyName}</Card.Header>
                <Card.Meta>{this.props.stock.symbol}</Card.Meta>
                <Card.Description>
                  <li>PE Ratio: {this.state.stock.peRatio}</li>
                  <li>Markt Cap: {accounting.formatMoney(this.state.stock.marketcap)}</li>
                  <li>PE Ratio: {this.state.stock.peRatio}</li>
                  <li>52 weeks Highest: {accounting.formatMoney(this.state.stock.week52high)}</li>
                  <li>52 weeks Lowest: {accounting.formatMoney(this.state.stock.week52low)}</li>
                  <li>Current price:
                    <strong> {accounting.formatMoney(this.state.marketPrice)}</strong>
                  </li>
                  <li><strong>{accounting.formatNumber(this.props.stock.amount_of_shares)}</strong> shares on hand</li>
                  <strong>Cash Value: {accounting.formatMoney(cashValue)}</strong>
                  <br></br>
                  <strong>Profit: {accounting.formatMoney(cashValue - cost)}</strong>
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
                          <Input fluid placeholder='price' name='purchasePrice' onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field>
                          <Button type='submit'>{this.state.buyStock
                              ? 'Buy'
                              : 'Sell'}</Button>
                        </Form.Field>
                      </Form.Group>
                    </Form>
                  : null}
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column>
            <List>
              {this.state.news.map(news => 
              <List.Item>
                <List.Content>
                  <Image avatar src={news.image}/>                 
                  <a href={news.url}>
                    <b>{news.headline}</b>
                  </a>
                  <List.Description>
                    {`${news.summary.substring(0, 100)}...`}
                  </List.Description>
                  <List.Header >Source: {news.source}</List.Header>
                </List.Content>
              </List.Item>)}
            </List>
          </Grid.Column>
        </Grid>
      </Segment>
    )
  }
}

export default connect(state => state.stocks, {editStock})(StockCard)