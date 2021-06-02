import userService from '../services/login'
import loginService from '../services/blogs'
import {createNotificationAction} from "./NotificationReducer";

const userReducer = (state = '', action) => {
    switch (action.type) {
        case('SET_USER'):
            return action.user
        case('RESET_USER'):
            return action.user
        case('USER_LOGIN'):
            return action.user
        case('ERROR'):
            return {
                error: true,
                message: action.data
            }
        default:
            return state

    }
}

export const setUserAC = (user) => {
    return async  dispatch => {
        await loginService.setToken(user.token)
        dispatch({
            type: 'SET_USER',
            user
        })
    }
}

export const userLoginAC = (username, password) => {
    return async  dispatch => {
        try {
            const user = await userService.login({
                username, password,
            })
            window.localStorage.setItem(
                'loggedBlogApp', JSON.stringify(user)
            )
            await loginService.setToken(user.token)
            dispatch({
                type: 'USER_LOGIN',
                user
            })

        } catch (exception) {
            const data = exception.response.data.error
            dispatch(createNotificationAction(data, 3000))
        }

    }
}

export const resetUserAC = () => {
    window.localStorage.removeItem('loggedBlogApp')
    return {
        type: 'RESET_USER',
        user: null
    }
}


export default userReducer
