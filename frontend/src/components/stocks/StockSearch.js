import faker from 'faker'
import _ from 'lodash'
import React from 'react'
import {connect} from 'react-redux'
import {Search, Grid, Header, Segment} from 'semantic-ui-react'

class SearchStocks extends React.Component {

  render() {
    return (
      <div>Stock Search</div>
    )
  }
}

export default connect(state => state.stocks)(SearchStocks)