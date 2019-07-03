import React from 'react'
import {connect} from 'react-redux'
import StockSearch from './StockSearch';
import { Container } from 'semantic-ui-react'

class WatchedStocks extends React.Component {
    render() {
        const watchedStocks = this.props.watchedStocks.filter
        return(
            <Container>
                <h1>Stocks Watchlist</h1>
                {watchedStocks}
                {/* <StockSearch/> */}
            </Container>
        )
    }
} 

export default connect(state => state.stocks)(WatchedStocks)