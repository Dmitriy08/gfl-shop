import {
    SET_USER_IS_AUTH,
    LOGOUT_USER,
} from "../actions/types";

const initialState = {
    currentUser: {},
    isAuth: false,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER_IS_AUTH:
            return {
                ...state,
                currentUser: action.payload,
                isAuth: true
            }
        case LOGOUT_USER:
            localStorage.removeItem('token')
            return {
                ...state,
                currentUser: {},
                isAuth: false
            }
        default:
            return state
    }
}