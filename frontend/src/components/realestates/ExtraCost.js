import React from 'react'
import {connect} from 'react-redux'
var accounting = require('accounting')

class Costs extends React.Component {
    render() {
        const costs = this.props.extraCost.filter(cost => cost.real_estate_id === this.props.real_estate_id)
        return costs !== undefined?
        (<ul>
            {costs.map(cost =>{
                return(
                <div>
                    <li>Item: {cost.item_name}/Cost: {accounting.formatMoney(cost.cost)}</li>
                    <li>{cost.description}</li>
                </div>
                )
            })}   
            </ul>
        ):null
    }
}

export default connect(state => state.extraCost)(Costs)