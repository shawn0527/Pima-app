import React, { Component } from 'react'
import { Search, Grid } from 'semantic-ui-react'
import {connect} from 'react-redux'
import _ from 'lodash'

const initialState = { isLoading: false, results: [], value: '' }

class StockSearch extends Component {
  state = initialState

  handleResultSelect = (e, { result }) => this.setState({ value: result.symbol })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      const source = this.props.allStocks
      if (this.state.value.length < 1) return this.setState(initialState)

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.symbol)

      console.log(this.props.allStocks)
      this.setState({
        isLoading: false,
        results: this.format(_.filter(source, isMatch).slice(0,5)),
      })
    }, 300)
  }

  format = array => {
    return array.map(stock => {
      return {
        'title': stock.symbol
      }
    })
  }

  render() {
    const { isLoading, value, results } = this.state
    return (
      <Grid>
        <Grid.Column width={6}>
          <Search
            aligned='right'
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true,
            })}
            results={results}
            value={value}
            // {...this.props}
          />
        </Grid.Column>
        {/* <Grid.Column width={10}>
          <Segment>
            <Header>State</Header>
            <pre style={{ overflowX: 'auto' }}>
              {JSON.stringify(this.state, null, 2)}
            </pre>
            <Header>Options</Header>
            <pre style={{ overflowX: 'auto' }}>
              {JSON.stringify(source, null, 2)}
            </pre>
          </Segment>
        </Grid.Column> */}
      </Grid>
    )
  }
}

export default connect(state => state.stocks)(StockSearch)