import {
    FETCH_PRODUCTS_STARTED,
    FETCH_PRODUCTS_FAILURE,
    FETCH_PRODUCTS_SUCCESS, SELECTED_CATEGORY, SELECTED_TYPE
} from "./types";

import productsApiService from "../services/products";

const loadProductsSuccess = (products) => ({
    type: FETCH_PRODUCTS_SUCCESS,
    payload: {
        ...products,
    },
});

const loadProductsStarted = () => {
    return {
        type: FETCH_PRODUCTS_STARTED,
    }
};

const loadProductsFailure = () => ({
    type: FETCH_PRODUCTS_FAILURE,
});

export const activeCategory = (category) => ({
    type: SELECTED_CATEGORY,
    payload: {
        ...category,
    },
})
export const activeType = (type) => ({
    type: SELECTED_TYPE,
    payload: {
        ...type,
    },
})

// export const loadProducts = () => dispatch => {
//     dispatch(loadProductsStarted());
//     productsApiService
//         .getProducts()
//         .then(response => response.json())
//         .then(data => {
//             dispatch(loadProductsSuccess(data));
//         })
//         .catch(error => {
//             dispatch(loadProductsFailure());
//         })
// }

export const loadProducts = (page = 1) => async (dispatch) => {
    dispatch(loadProductsStarted());
    try {
        const products = await productsApiService
            .getProducts()
            .then((res) => res.json());
        dispatch(loadProductsSuccess(products));
    } catch {
        dispatch(loadProductsFailure());
    }
};
