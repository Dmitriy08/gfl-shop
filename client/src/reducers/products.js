import {
    FETCH_PRODUCTS_STARTED,
    FETCH_PRODUCTS_FAILURE,
    FETCH_PRODUCTS_SUCCESS,
} from "../actions/types";

const initialState = {
    products: [
        {
            "id_product": 1,
            "product_name": "Футболка 1",
            "product_description": "охрененная",
            "product_price": 100,
            "product_avaible": "YES",
            "product_count": 10,
            "product_keywords": "футболка, одежда",
            "product_structure": 1
        },
        {
            "id_product": 4,
            "product_name": "Футболка 2",
            "product_description": "Хорошая",
            "product_price": 10,
            "product_avaible": "NO",
            "product_count": 50,
            "product_keywords": "фут",
            "product_structure": 1
        },
        {
            "id_product": 5,
            "product_name": "Футболка 3",
            "product_description": "плохаяб китайская",
            "product_price": 1,
            "product_avaible": "YES",
            "product_count": 100000,
            "product_keywords": "не покупать",
            "product_structure": 2
        }
    ],
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
        }
    ],
    fetchingProducts: false,
    productsError: false,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_PRODUCTS_STARTED: {
            return {
                ...state,
                fetchingProducts: true,
                planetsError: false,
            };
        }
        case FETCH_PRODUCTS_FAILURE: {
            return {
                ...state,
                fetchingProducts: false,
                planetsError: true,
            };
        }
        case FETCH_PRODUCTS_SUCCESS: {
            return {
                ...state,
                fetchingProducts: false,
                planets: action.payload,
            };
        }
        default:
            return state;
    }
}