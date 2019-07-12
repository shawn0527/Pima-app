import React, { Component } from 'react'
import { Search, Grid, Loader } from 'semantic-ui-react'
import {connect} from 'react-redux'
import _ from 'lodash'
const accounting = require('accounting')
const price = symbol => `https://cloud.iexapis.com/stable/stock/${symbol}/price?token=pk_8af4c42d6c704ca299d89a50a46e0628`
const initialState = {priceLoading: true, isLoading: false, results: [], value: '' }
const stockLogo = symbol => `https://cloud.iexapis.com/stable/stock/${symbol}/logo?token=pk_8af4c42d6c704ca299d89a50a46e0628`
class StockSearch extends Component {
  state = initialState

  handleResultSelect = (e, { result }) => this.setState({ value: result.name })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })
    setTimeout(() => {
      const source = this.props.allStocks
      if (this.state.value.length < 1) return this.setState(initialState)
      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.name)
      this.setState({
        isLoading: false,
        results: this.format(_.filter(source, isMatch).slice(0,5)),
      })
    }, 1000)
  }

  format = array => {
    return array.map(stock => {
      fetch(price(stock.symbol), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json()).then(data => {stock.price = accounting.formatMoney(data); this.setState({priceLoading:false}); return stock})
      
      fetch(stockLogo(stock.symbol), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json()).then(data =>{stock.image = data.url; return stock})
      
        return {
        'title': stock.symbol,
        'description': stock.name,
        'price': this.state.priceLoading?<Loader active inline />:stock.price,
        'image': stock.image
        }
    })
  }  
        // {newArr.push(stock);return newArr}).then(newArr => {
    //   // debugger
    //   newArr.map(stock =>{
    //   return {
    //     'title': stock.symbol,
    //     'description': stock.name,
    //     'price': stock.price
    //   }
    // })
  // })
  


  render() {
    const { isLoading, value, results } = this.state
    document.body.setAttribute('class', 'stock-page')
    return (
      <Grid style={{position: 'absolute',left: '40%'}}>
        <Grid.Column width={6}>
          <Search
            aligned='right'
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 1000, {
              leading: true,
            })}
            results={results}
            value={value}
            {...this.props}
          />
        </Grid.Column>
      </Grid>
    )
  }
}

export default connect(state => state.stocks)(StockSearch)