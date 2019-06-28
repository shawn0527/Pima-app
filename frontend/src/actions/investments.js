export const addInvestment = investment => {
    return {
        type: 'ADD_INVESTMENT',
        investment
    }
}

export const editInvestment = investment => {
    return {
        type: 'EDIT_INVESTMENT',
        investment
    }
}

export const sellInvestment = investment => {
    return {
        type: 'SELL_INVESTMENT',
        investment
    }
}