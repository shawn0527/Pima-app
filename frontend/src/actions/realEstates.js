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

export const sellRealEstate = realEstate => {
    return {
        type: 'SELL_REALESTATE',
        realEstate
    }
}