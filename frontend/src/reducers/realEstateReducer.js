export default (state = {realEstates: []}, action) => {
    switch(action.type) {
        case 'ALL_REALESTATES':
            return {...state, realEstates: [...action.allRealEstates.filter(realestate => realestate.user_id == action.userId)]}
        case 'ADD_REALESTATE':
            return {...state, realEstates: [...state.realEstates, action.realEstate]}
        case 'EDIT_REALESTATE':
            return [...state.filter(realEstate => realEstate.id !== action.realEstate.id), action.realEstate]
        case 'SELL_REALESTATE':
            return {...state, realEstates: state.realEstates.filter(realEstate => realEstate.id !== action.id)}
        case 'TOTAL':
            let realEstate = state.realEstates.find(realEstate => realEstate.id === action.id)
            realEstate.total = action.cost
            return {...state, realEstates: [...state.realEstates.filter(realEstate => realEstate.id !== action.id), realEstate]}
        case 'DELETE_COST':
            let theRealEstate = state.realEstates.find(realEstate => realEstate.id === action.id)
            theRealEstate.total -= action.cost
            return {...state, realEstates: [...state.realEstates.filter(realEstate => realEstate.id !== action.id), theRealEstate]}
        default:
            return state
    }
}