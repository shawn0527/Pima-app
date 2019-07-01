import React from 'react'
import {connect} from 'react-redux'

class RecStocks extends React.Component {
    render() {
        return(
            <div>
                RecStocks
            </div>
        )
    }
} 

export default connect(state => state.stocks)(RecStocks)