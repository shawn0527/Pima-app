import React from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {Pie} from 'react-chartjs-2'

class HomePage extends React.Component {
  state = {
    stockValue: 0,
    realEstateValue: 0
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
            realEstateValue: data.realestate_value
          })
        })
    }
  }

  render() {
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
    return (
      <div>
        HomePage
        <h1>{this.props.userData.user !== undefined?this.props.userData.user.firstname:null}</h1>
        <p>table</p>
        <h2>Portfolio</h2>
        <Pie data={data}/>
        <p>total amount</p>
        <p>CPI</p>
        <NavLink to={localStorage.username !== undefined?`/${localStorage.username}/stocks`:'/'}>Stock</NavLink>
        <br></br>
        <NavLink to={localStorage.username !== undefined?`/${localStorage.username}/realestates`:'/'}>RealEstate</NavLink>
        <br></br>
        <NavLink to='/:username/investments'>Investment</NavLink>
      </div>
    )
  }
}

export default connect(state => state)(HomePage)