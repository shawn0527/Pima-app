export default (state = {}, action) => {
    switch(action.type) {
        case 'ADD_USER':
            return action.user
        case 'EDIT_USER':
            return action.user
        default:
            return state
    }
}