import React from 'react'
import {Segment, Grid, Table, Divider} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {Pie} from 'react-chartjs-2'
import Loading from '../components/Loading'
const accounting = require('accounting')

class HomePage extends React.Component {
  state = {
    stockValue: 0,
    realEstateValue: 0,
    isLoading: true
  }

  componentDidMount() {
    if (localStorage.token === undefined) {
      this.props.history.push('/')
    } else {
      fetch(`http://localhost:3000/users/${localStorage.username}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorized": `Bear ${localStorage.token}`
          }
        })
        .then(res => res.json())
        .then(data => {
          this.setState({
            stockValue: data.stock_value,
            realEstateValue: data.realestate_value,
            isLoading: false
          })
        })
    }
  }

  render() {
    document.body.setAttribute('class', 'home-page')
    const data = {
      labels: [
        'Stocks',
        'Real Estates',
        'Other Investments'
      ],
      datasets: [{
        data: [this.state.stockValue, this.state.realEstateValue, 100000],
        backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56'
        ],
        hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56'
        ]
      }]
    };
    return (this.state.isLoading?<Loading/>
        :<Segment>
          <Grid columns={2} relaxed='very'>
            <Grid.Column>
              <h2>Portfolio</h2>
              <Pie data={data}/>
            </Grid.Column>
            <Grid.Column>
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Investment Name</Table.HeaderCell>
                    <Table.HeaderCell>Current Cash Value</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>Stocks</Table.Cell>
                    <Table.Cell>{accounting.formatMoney(this.state.stockValue)}</Table.Cell>
                    <Table.Cell selectable>
                      <a href='#'></a>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Real Estates</Table.Cell>
                    <Table.Cell>{accounting.formatMoney(this.state.realEstateValue)}</Table.Cell>
                    <Table.Cell selectable>
                      <a href='#'></a>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Other Investment</Table.Cell>
                    <Table.Cell>{accounting.formatMoney(10000)}</Table.Cell>
                    <Table.Cell selectable>
                      <a href='#'></a>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid>
          <Divider horizontal></Divider>
        </Segment>
    )
  }
}

export default connect(state => state)(HomePage)