import React from 'react'
const accounting = require('accounting')


export default class Cost extends React.Component {

    render() {
        const cost = this.props.cost
        return(
        <div>
            <li>Item: {cost.item_name}/Cost: {accounting.formatMoney(cost.cost)}</li>
            <li>Description: {cost.description}</li>
        </div>
        )
    }
}