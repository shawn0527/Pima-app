export default (state = [], action) => {
    switch(action.type) {
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