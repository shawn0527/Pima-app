export default (state = {allStocks: [], myStocks: [], watchedStocks: []}, action) => {
    switch(action.type) {
        case 'ALL_STOCKS':
            return {...state, allStocks: action.allStocks}
        case 'ADD_STOCK':
            return {...state, myStocks: [...[...state.myStocks, action.stock].sort((a,b) => a.symbol - b.symbol)]}
        case 'EDIT_STOCK':
            return {...state, myStocks: [...[...state.myStocks.filter(stock => stock.id !== action.stock.id), action.stock].sort((a, b) => a.symbol - b.symbol)]}
        case 'SELL_STOCK':
            return state.filter(stock => stock !== action.stock)
        default:
            return state
    }
}