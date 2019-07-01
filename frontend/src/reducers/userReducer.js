export default (state = {}, action) => {
    switch(action.type) {
        case 'LOGGEDIN_USER':
            return action.userData
        case 'EDIT_USER':
            return action.userData
        default:
            return state
    }
}