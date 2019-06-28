export const addStock = stock => {
    return {
        type: 'ADD_STOCK',
        stock
    }
}

export default editStock = stock => {
    return {
        type: 'EDIT_STOCK',
        stock
    }
}

export default sellStock = stock => {
    return {
        type: 'SELL_STOCK',
        stock
    }
}
