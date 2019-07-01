export const userLogin = userData => {
    return {
        type: 'LOGGEDIN_USER',
        userData
    }
}

export const editUser = userData => {
    return {
        type: 'EDIT_USER',
        userData
    }
}