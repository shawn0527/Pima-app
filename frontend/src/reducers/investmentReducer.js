export default (state = [], action) => {
    switch(action.type) {
        case 'ADD_INVESTMENT':
            return [...state, action.investment]
        case 'EDIT_INVESTMENT':
            return [...state.filter(investment => investment.id !== action.investment.id), action.investment]
        case 'SELL_INVESTMENT':
            return state.filter(investment => investment !== action.investment)
        default:
            return state
    }
}