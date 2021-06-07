import {
    FETCH_PRODUCTS_STARTED,
    FETCH_PRODUCTS_FAILURE,
    FETCH_PRODUCTS_SUCCESS,
    SELECTED_CATEGORY, SELECTED_TYPE
} from "../actions/types";

const initialState = {
    products: null,
    categories: [
        {
            "id_category": 1,
            "category_name": "Cat 1",
            "categiry_description": "Description for cat 1"
        },
        {
            "id_category": 2,
            "category_name": "Cat 2",
            "categiry_description": "Description for cat 2"
        },
        {
            "id_category": 3,
            "category_name": "asdasdasd",
            "categiry_description": "dadasdasd"
        },
        {
            "id_category": 34,
            "category_name": "asdasdasd",
            "categiry_description": "dadasdasd"
        },
        {
            "id_category": 35,
            "category_name": "asdasdasd",
            "categiry_description": "dadasdasd"
        }
    ],
    types: [
        {
            "id_type": 1,
            "type_name": "Type 1",
        },
        {
            "id_type": 2,
            "type_name": "Type 2",
        },
        {
            "id_type": 3,
            "type_name": "Type 2",
        },
        {
            "id_type": 4,
            "type_name": "Type 2",
        },

    ],
    fetchingProducts: false,
    productsError: false,
    selectedCategory: {},
    selectedType: {},
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_PRODUCTS_STARTED: {
            return {
                ...state,
                fetchingProducts: true,
                productsError: false,
            };
        }
        case SELECTED_CATEGORY: {
            return {
                ...state,
                selectedCategory: action.payload,
            };
        }

        case SELECTED_TYPE: {
            return {
                ...state,
                selectedType: action.payload,
            };
        }
        case FETCH_PRODUCTS_FAILURE: {
            return {
                ...state,
                fetchingProducts: false,
                productsError: true,
            };
        }
        case FETCH_PRODUCTS_SUCCESS: {
            return {
                ...state,
                fetchingProducts: false,
                products: action.payload,
            };
        }
        default:
            return state;
    }
}
