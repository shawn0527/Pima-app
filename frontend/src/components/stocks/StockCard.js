import React from 'react'

const StockCard = props => {
    return(
        <ul>
            <li>{props.stock.symbol}</li>
            <li>{props.stock.name}</li>
        </ul>
    )
}

export default StockCard