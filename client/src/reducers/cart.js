import {
    FETCH_CART_STARTED,
    FETCH_CART_FAILURE,
    FETCH_CART_SUCCESS,
} from "../actions/types";

const initialState = {
    cart: [],
    fetchingCart: false,
    cartError: false,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_CART_STARTED: {
            return {
                ...state,
                fetchingCart: true,
                cartError: false,
            };
        }
        case FETCH_CART_FAILURE: {
            return {
                ...state,
                fetchingCart: false,
                cartError: true,
            };
        }
        case FETCH_CART_SUCCESS: {
            return {
                ...state,
                fetchingCart: false,
                cart: action.payload,
            };
        }
        default:
            return state;
    }
}
