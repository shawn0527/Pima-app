import React from 'react'
import {connect} from 'react-redux'
import StockCard from './StockCard'
import StockForm from './StockForm'


class MyStocks extends React.Component {
    render() {
        const myStocks = this.props.myStocks.map(stock => <StockCard key={stock.id} stock={stock}/>)
        return (
            <div>
                <h1>My Stocks</h1>
                {myStocks}
                <StockForm/>
            </div>
        )
    }
}

export default connect(state => state.stocks)(MyStocks)