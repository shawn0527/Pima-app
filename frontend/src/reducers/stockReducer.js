export default (state = {allStocks: [], myStocks: [], recStocks: []}, action) => {
    switch(action.type) {
        case 'ALL_STOCKS':
            return {...state, allStocks: action.allStocks}
        case 'ADD_STOCK':
            return [...state, action.stock]
        case 'EDIT_STOCK':
            return [...state.filter(stock => stock.id !== action.stock.id), action.stock]
        case 'SELL_STOCK':
            return state.filter(stock => stock !== action.stock)
        default:
            return state
    }
}