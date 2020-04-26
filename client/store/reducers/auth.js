import {
    AUTH_LOGOUT,
    POST_LOGIN_SUCCESS,
    POST_REGISTER_SUCCESS,
    POST_EMAIL_CONFIRM_SUCCESS
} from '@client/store/actions/auth'

let initialState = null

try {
    initialState = JSON.parse(localStorage.getItem('auth'))
} catch (e) {}

if (!initialState) {
    initialState = {
        user: null,
        token: null
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case POST_LOGIN_SUCCESS:
            return {
                ...state,
                ...action.payload.data.data
            }
        case POST_REGISTER_SUCCESS:
            return {
                ...state,
                ...action.payload.data.data
            }
        case AUTH_LOGOUT:
            return {
                user: null,
                token: null
            }
        case POST_EMAIL_CONFIRM_SUCCESS:
            return {
                ...state,
                ...action.payload.data.data
            }
        default:
            return state
    }
}
