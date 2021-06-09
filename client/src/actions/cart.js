import {
    FETCH_CART_FAILURE,
    FETCH_CART_STARTED,
    FETCH_CART_SUCCESS,
} from "./types";

import cartApiService from "../services/cart";

const loadCartSuccess = (cart) => ({
    type: FETCH_CART_SUCCESS,
    payload: {
        ...cart,
    },
});

const loadCartStarted = () => {
    return {
        type: FETCH_CART_STARTED,
    }
};

const loadCartFailure = () => ({
    type: FETCH_CART_FAILURE,
});


export const loadCart = () => async (dispatch) => {
    dispatch(loadCartStarted());
    try {
        const token = localStorage.getItem('token')
        const cart = await cartApiService
            .getCart(token)
            .then((res) => res.json());
        dispatch(loadCartSuccess(cart));
    } catch {
        dispatch(loadCartFailure());
    }
};
