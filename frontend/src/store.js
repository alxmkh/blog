import {createStore, combineReducers, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/NotificationReducer'
import blogReducer from './reducers/BlogReducer'
import userReducer from './reducers/LoginReducer'
import usersReducer from './reducers/UsersReducer'

const reducer = combineReducers(
    {
        notification: notificationReducer,
        blog: blogReducer,
        user: userReducer,
        users: usersReducer
    })
const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk)
    )
)

export default store