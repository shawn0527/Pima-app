import React from 'react'
import StockSearch from '../components/stocks/StockSearch'
import MyStocks from '../components/stocks/MyStocks'
import WatchedStocks from '../components/stocks/WatchedStocks'
import {connect} from 'react-redux'
import {getAllStocks} from '../actions/stocks'
import {addStock} from '../actions/stocks'
const stocksAPI = 'https://cloud.iexapis.com/stable/ref-data/symbols?token=pk_8af4c42d6c704ca299d89a50a46e0628'
const stockUrl = 'http://localhost:3000/stocks'

class Stock extends React.Component {
    state = {}

    componentDidMount() {
        fetch(stocksAPI, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            this.props.getAllStocks(data.filter(stock => stock.isEnabled === true))
        })
        .then(
            fetch(stockUrl, {
                method: 'GET',
                headers: {
                    'Contetn-Type': 'application/json',
                    'Authorized': `Bear ${localStorage.token}`
                }
            })
            .then(res => res.json())
            .then(data => {
                data.filter(stock => stock.user_id == localStorage.user_id).map(stock => this.props.addStock(stock))
            })
        )
    }

    render() {
        return(
            <div>
                Stocks
                <StockSearch/>
                <MyStocks/>
                {/* <WatchedStocks/> */}
            </div>
        )
    }
}

export default connect(state => state, {getAllStocks, addStock})(Stock)