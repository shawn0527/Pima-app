import React from 'react'
import {List, Button} from 'semantic-ui-react'
const accounting = require('accounting')


export default class Cost extends React.Component {
    render() {
        const cost = this.props.cost
        return(
            <List.Item as='ol'>
                <List.Item as='li' value='*'>Item: {cost.item_name}
                <Button size='mini' onClick={() => this.props.deleteCost(this.props.cost.id)}>-</Button>
                <List.Item as='ol'>
                    <List.Item as='li' value='-'>Cost: {accounting.formatMoney(cost.cost)}</List.Item>
                    <List.Item as='li' value='-'>Description: {cost.description}</List.Item>
                </List.Item>
                </List.Item>
            </List.Item>
        )
    }
}