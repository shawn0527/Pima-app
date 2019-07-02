import React from 'react'
import StockSearch from '../components/stocks/StockSearch'
import MyStocks from '../components/stocks/MyStocks'
import RecStocks from '../components/stocks/RecStocks'
import {connect} from 'react-redux'
import {getAllStocks} from '../actions/stocks'
const stocksURL = 'https://cloud.iexapis.com/stable/ref-data/symbols?token=pk_8af4c42d6c704ca299d89a50a46e0628'

class Stock extends React.Component {
    state = {}

    componentDidMount() {
        fetch(stocksURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            this.props.getAllStocks(data.filter(stock => stock.isEnabled === true))
        })
    }

    render() {
        console.log(this.props)
        
        return(
            <div>
                Stocks
                {/* <StockSearch/> */}
                <MyStocks/>
                <RecStocks/>
            </div>
        )
    }
}

export default connect(state => state, {getAllStocks})(Stock)