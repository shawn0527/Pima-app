import React from 'react'
import {connect} from 'react-redux'
import StockCard from './StockCard'
import StockForm from './StockForm'

class MyStocks extends React.Component {
    state = {}

    render() {
        console.log(this.props)
        const myStocks = this.props.stocks.myStocks.map(stock => <StockCard stock={stock}/>)
        return (
            <div>
                <h1>My Stocks</h1>
                {myStocks}
                <StockForm/>
            </div>
        )
    }
}

export default connect(state => state)(MyStocks)