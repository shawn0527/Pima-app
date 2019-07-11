export default (state = {allStocks: [], myStocks: [], watchedStocks: []}, action) => {
    switch(action.type) {
        case 'ALL_STOCKS':
            return {...state, allStocks: action.allStocks}
        case 'ADD_STOCK':
            let newAllStocks = [...state.myStocks, action.stock].sort((a,b) => { if(a.symbol < b.symbol) {return -1} if(a.symbol > b.symbol) {return 1}})
            return {...state, myStocks: newAllStocks}
        case 'EDIT_STOCK':
            let newStocks = [...state.myStocks.filter(stock => stock.id !== action.stock.id), action.stock].sort((a, b) => { if(a.symbol < b.symbol) {return -1} if(a.symbol > b.symbol) {return 1}})
            return {...state, myStocks: newStocks}
        case 'SELL_STOCK':
            return state.filter(stock => stock !== action.stock)
        default:
            return state
    }
}