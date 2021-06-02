import usersServices from '../services/blogs'

const usersReducer = (state=[], action) => {
    switch (action.type) {
        case 'INIT_USERS':
            return action.data.sort(compare).map(users => users)
        default:
            return state
    }
}

export const getAllUsersAC = () => {
    return async dispatch => {
        const users = await usersServices.getAllUsers()
        dispatch({
            type: 'INIT_USERS',
            data: users
        })
    }
}

const compare = (a, b) => {
    let comparison = 1;
    if (a.likes > b.likes) {
        comparison = 0;
    } else if (a.likes < b.likes) {
        comparison = -1;
    }
    return comparison;
}

export default usersReducer