import React from 'react'
import {
  Segment,
  Grid,
  Divider,
  Form,
  Input,
  Card,
  Button,
  Image,
  List
} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {editStock} from '../../actions/stocks'
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
        // debugger
        this.setState({
          news: data
      })}))
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
        console.log(data, this.props)
        this
          .props
          .editStock(data.stock)
      })

    e
      .target
      .reset()
  }

  render() {
    console.log(this.state.news)
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
      <Segment>
        <Grid columns={2} relaxed='very'>
          <Grid.Column>
            <Card>
              <Card.Content>
                <Image floated='right' size='mini' src={this.state.stock.logo}/>
                <Card.Header>{this.state.stock.companyName}</Card.Header>
                <Card.Meta>{this.props.stock.symbol}</Card.Meta>
                <Card.Description>
                  <li>PE Ratio: {this.state.stock.peRatio}</li>
                  <li>Markt Cap: ${this.state.stock.marketcap}</li>
                  <li>PE Ratio: {this.state.stock.peRatio}</li>
                  <li>52 weeks Highest: {this.state.stock.week52high}</li>
                  <li>52 weeks Lowest: {this.state.stock.week52low}</li>
                  <li>Current price:
                    <strong>{this.state.marketPrice}</strong>
                  </li>
                  <li>
                    <strong>{this.props.stock.amount_of_shares}</strong>
                    shares on hand</li>
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
                          <Input
                            fluid
                            placeholder='amount of shares'
                            name='shares'
                            onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field>
                          <Input
                            fluid
                            placeholder='price'
                            name='purchasePrice'
                            onChange={this.handleChange}/>
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
              {this
                .state
                .news
                .map(news => <List.Item>
                  <Image avatar src={news.image}/>
                  <List.Content>
                    <List.Header as='a'>{news.source}</List.Header>
                    <List.Description>
                      Last seen watching{' '}
                      <a href={news.url}>
                        <b>{news.headline}</b>
                      </a>{' '}
                      just now.
                    </List.Description>
                  </List.Content>
                </List.Item>)}
            </List>
          </Grid.Column>
        </Grid>
        <Divider></Divider>
      </Segment>
    )
  }
}

export default connect(state => state.stocks, {editStock})(StockCard)