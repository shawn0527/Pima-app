import React from 'react'
import {Form, Input} from 'semantic-ui-react'
import {Button} from 'react-bootstrap'

class StockForm extends React.Component {
    state = {}





  render() {
    return (
      <Form onSubmit={e => this.addStock(e)}>
        <Form.Group widths='equal'>
          <Form.Field>
            <label>Symbol</label>
            <Input fluid placeholder='Symbol'/>
          </Form.Field>
          <Form.Field>
            <label>Purchased Price</label>
            <Input fluid placeholder='Price'/>
          </Form.Field>
          <Form.Field>
            <label>Amount of Shares</label>
            <Input fluid placeholder='Shares'/>
          </Form.Field>
        </Form.Group>
        <Button variant="success">Add Stock</Button>
      </Form>
    )
  }
}

export default StockForm