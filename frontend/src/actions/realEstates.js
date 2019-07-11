export const allRealEstates = (allRealEstates, userId) => {
    return {
        type: 'ALL_REALESTATES',
        allRealEstates,
        userId
    }
}

export const addRealEstate = realEstate => {
    return {
        type: 'ADD_REALESTATE',
        realEstate
    }
}

export const editRealEtate = realEstate => {
    return {
        type: 'EDIT_REALESTATE',
        realEstate
    }
}

export const sellRealEstate = id => {
    return {
        type: 'SELL_REALESTATE',
        id
    }
}

export const totalCost = (id, cost) => {
    return {
        type: 'TOTAL',
        id,
        cost
    }
}

export const deleteCost = (id, cost) => {
    return {
        type: 'DELETE_COST',
        id,
        cost
    }
}