export const getAllStocks = allStocks => {
    return {
        type: 'ALL_STOCKS',
        allStocks
    }
}

export const addStock = stock => {
    debugger
    return {
        type: 'ADD_STOCK',
        stock
    }
}

export const editStock = stock => {
    return {
        type: 'EDIT_STOCK',
        stock
    }
}

export const sellStock = stock => {
    return {
        type: 'SELL_STOCK',
        stock
    }
}
