import {
    FETCH_CART_STARTED,
    FETCH_CART_FAILURE,
    FETCH_CART_SUCCESS,
    ADD_ITEM_CART,
    SUB_ITEM_CART
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
        case ADD_ITEM_CART:
            let id = action.payload

            return {
                ...state,
                cart: state.cart.map((product, index) =>
                    index === id
                        ? {...product, product_count: product.product_count + 1}
                        : product,
                ),
            }

        case SUB_ITEM_CART:
            let itemId = action.payload

            if(state.cart[itemId].product_count === 1){

                return {
                    ...state,
                    cart: state.cart.filter((item) => item.id_cart !== state.cart[itemId].id_cart)
                }
            }
            return {
                ...state,
                cart: state.cart.map((product, index) =>{
                    return  index === itemId
                        ? {...product,  product_count: product.product_count !== 1 ? product.product_count - 1 : 1,}
                        : product
                    }
                ),
            }
        default:
            return state;
    }
}
