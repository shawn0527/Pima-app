import { combineReducers } from 'redux'
import users from './userReducer'
import stocks from './stockReducer'
import realEstates from './realEstateReducer'
import investments from './investmentReducer'

export default combineReducers({
    users,
    stocks,
    realEstates,
    investments
})