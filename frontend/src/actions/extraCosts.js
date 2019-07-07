export const allCosts = (allCost, real_estate_id) => {
    return {
        type: 'ALL_COST',
        allCost,
        real_estate_id
    }
}

export const addCost = cost => {
    return {
        type: 'ADD_COST',
        cost
    }
}
