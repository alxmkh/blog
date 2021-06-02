const defaultNotificationObject = {
    notification: null,
    timeoutID: null
}

const notificationReducer = (state = defaultNotificationObject, action) => {
    switch(action.type) {
        case 'SET_TIMEOUT_ID':
            return {
                notification: state.notification,
                timeoutID: action.data
            }

        case 'SHOW_NOTIFICATION':
            if (state.timeoutID) {
                clearTimeout(state.timeoutID)
            }
            return {
                notification: action.data,
                timeoutID: null
            }

        case 'HIDE_NOTIFICATION':
            return {
                notification: null,
                timeoutID: null
            }

        default:
            return state
    }
}

export const createNotificationAction = (message, timeout) => {
    return async (dispatch) => {
        dispatch(createShowNotificationAction(message))
        const timeoutID = setTimeout(() => {
            dispatch(createHideNotificationAction())
        }, timeout)
        dispatch(createSetTimeoutAction(timeoutID))
    }
}

export const createShowNotificationAction = (message) => ({
    type: 'SHOW_NOTIFICATION',
    data: message
})

export const createHideNotificationAction = () => ({
    type: 'HIDE_NOTIFICATION'
})

export const createSetTimeoutAction = (timeoutID) => ({
    type: 'SET_TIMEOUT_ID',
    data: timeoutID
})

export default notificationReducer