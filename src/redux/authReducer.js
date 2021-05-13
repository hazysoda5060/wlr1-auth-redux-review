// initial state
const initialState = {
    user: null
}

// action types
const SAVE_USER = "SAVE_USER"
const LOGOUT_USER = "LOGOUT_USER"

// action builders
export function saveUser(user) {
    return {
        type: SAVE_USER,
        payload: user
    }
}

export function logoutUser() {
    return {
        type: LOGOUT_USER,
        payload: null
    }
}

// reducer
export default function authReducer(state = initialState, action) {
    switch(action.type) {
        case SAVE_USER:
            return {...state, user: action.payload}
        case LOGOUT_USER:
            return {...state, user: action.payload}
        default:
            return {...state}
    }
}