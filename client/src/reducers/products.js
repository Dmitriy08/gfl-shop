import {
    FETCH_PRODUCTS_STARTED,
    FETCH_PRODUCTS_FAILURE,
    FETCH_PRODUCTS_SUCCESS,
} from "../actions/types";

const initialState = {
    products: null,
    fetchingProducts: false,
    productsError: false,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_PRODUCTS_STARTED: {
            return {
                ...state,
                fetchingPlanets: true,
                planetsError: false,
            };
        }
        case FETCH_PRODUCTS_FAILURE: {
            return {
                ...state,
                fetchingPlanets: false,
                planetsError: true,
            };
        }
        case FETCH_PRODUCTS_SUCCESS: {
            return {
                ...state,
                fetchingPlanets: false,
                planets: action.payload,
            };
        }
        default:
            return state;
    }
}