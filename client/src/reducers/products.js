import {
    FETCH_PRODUCTS_STARTED,
    FETCH_PRODUCTS_FAILURE,
    FETCH_PRODUCTS_SUCCESS,
    SELECTED_CATEGORY, SELECTED_TYPE
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
            "id_product": 12,
            "product_name": "Футболка 1",
            "product_description": "охрененная",
            "product_price": 100,
            "product_avaible": "YES",
            "product_count": 10,
            "product_keywords": "футболка, одежда",
            "product_structure": 1
        },
        {
            "id_product": 13,
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
                planetsError: false,
            };
        }
        case SELECTED_CATEGORY: {
            console.log('action.payload', action.payload)
            return {
                ...state,
                selectedCategory: action.payload,
            };
        }

        case SELECTED_TYPE: {
            console.log('action.payload', action.payload)
            return {
                ...state,
                selectedType: action.payload,
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
