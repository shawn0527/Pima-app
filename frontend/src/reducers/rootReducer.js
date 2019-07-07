import { combineReducers } from 'redux'
import userData from './userReducer'
import stocks from './stockReducer'
import realEstates from './realEstateReducer'
import investments from './investmentReducer'
import extraCost from './extraCostReducer'

export default combineReducers({
    userData,
    stocks,
    realEstates,
    investments,
    extraCost
})