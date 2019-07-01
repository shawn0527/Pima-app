import React from 'react'
import {connect} from 'react-redux'

class MyStocks extends React.Component {
    state = {}

    render() {
        return (
            <div>
                MyStocks
            </div>
        )
    }
}

export default connect(state => state.stocks)(MyStocks)