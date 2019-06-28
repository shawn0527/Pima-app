import React from 'react';
import './App.css';
import Index from './containers/IndexContainer'
import NavBar from './components/NavBar'
import Login from './containers/LoginContainer'
import Register from './containers/RegisterContainer'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import HomePage from './containers/HomePageContainer'
import Stock from './containers/StockContainer'
import RealEstate from './containers/RealEstateContainer'
import Investment from './containers/InvestmentContainer'

class App extends React.Component {
  render() {
    return (
      <Router>
        <React.Fragment>
        <NavBar/>
        <Switch>
          <Route exact path='/' component={Index}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/register' component={Register}/>
          {/* :username to go sepcific user's HomePage */}
          <Route exact path='/user' component={HomePage}/>
          <Route exact path='/user/stocks' component={Stock}/>
          <Route exact path='/user/realestates' component={RealEstate}/>
          <Route exact path='/user/investments' component={Investment}/>
        </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
