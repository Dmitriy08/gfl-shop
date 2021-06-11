import {
    ADD_ITEM_CART,
    FETCH_CART_FAILURE,
    FETCH_CART_STARTED,
    FETCH_CART_SUCCESS,
    SUB_ITEM_CART,
} from "./types";

import cartApiService from "../services/cart";

const loadCartSuccess = (cart) => ({
    type: FETCH_CART_SUCCESS,
    payload: [
        ...cart,
    ],
});

const loadCartStarted = () => {
    return {
        type: FETCH_CART_STARTED,
    }
};

const loadCartFailure = () => ({
    type: FETCH_CART_FAILURE,
});

export const addItemToCart = (index) => ({
    type: ADD_ITEM_CART,
    payload: index
});


export const subItemToCart = (index) => ({
    type: SUB_ITEM_CART,
    payload: index
});

export const loadCart = () => async (dispatch) => {
    dispatch(loadCartStarted());
    try {

        const token = localStorage.getItem('token')
        const cart = await cartApiService
            .getCart(token)
            .then((res) => res.json());
        console.log(cart)
        dispatch(loadCartSuccess(cart));
    } catch {
        dispatch(loadCartFailure());
    }
};
