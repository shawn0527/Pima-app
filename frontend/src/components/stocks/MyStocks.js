import React from 'react'
import {connect} from 'react-redux'
import StockCard from './StockCard'
import StockForm from './StockForm'
import {Container, Button, Header, Icon, Modal} from 'semantic-ui-react'

class MyStocks extends React.Component {
  render() {
    const myStocks = this
      .props
      .myStocks
      .map(stock => <StockCard key={stock.id} stock={stock}/>)
    return (
      <Container>
        <h1>My Stocks</h1>
        <Modal trigger={<Button positive>Add Stock </Button>} basic size='small' closeIcon>
          <Header icon='chart line' content='Add Stock'/>
          <Modal.Content>
            <StockForm/>
          </Modal.Content>
        </Modal>
        {myStocks}
      </Container>
    )
  }
}

export default connect(state => state.stocks)(MyStocks)