export default (state ={ extraCost: []}, action) => {
    switch (action.type) {
        case 'ALL_COST':
            return {...state, extraCost: action.allCost.filter(cost => cost.real_estate_id === action.real_estate_id)}
        case 'ADD_COST':
            return {...state, extraCost: [...state.extraCost, action.extraCost]}
        default:
            return state
    }
}