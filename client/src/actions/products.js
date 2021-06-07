import {
    FETCH_PRODUCTS_STARTED,
    FETCH_PRODUCTS_FAILURE,
    FETCH_PRODUCTS_SUCCESS, SELECTED_CATEGORY, SELECTED_TYPE
} from "./types";

import planetsApiService from "../services/products";

const loadPlanetsSuccess = (planets) => ({
    type: FETCH_PRODUCTS_SUCCESS,
    payload: {
        ...planets,
    },
});

const loadPlanetsStarted = () => ({
    type: FETCH_PRODUCTS_STARTED,
});

const loadPlanetsFailure = () => ({
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

// export const loadProducts = (page = 1) => async (dispatch) => {
//     dispatch(loadPlanetsStarted());
//     try {
//         const products = await planetsApiService
//             .getPlanets(page)
//             .then((res) => res.json());
//
//         dispatch(loadPlanetsSuccess(planets));
//     } catch {
//         dispatch(loadPlanetsFailure());
//     }
// };
