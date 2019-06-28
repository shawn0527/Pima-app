export default (state = [], action) => {
    switch(action.type) {
        case 'ADD_REALESTATE':
            return [...state, action.realEstate]
        case 'EDIT_REALESTATE':
            return [...state.filter(realEstate => realEstate.id !== action.realEstate.id), action.realEstate]
        case 'SELL_REALESTATE':
            return state.filter(realEstate => realEstate !== action.realEstate)
        default:
            return state
    }
}