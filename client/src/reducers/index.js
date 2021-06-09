import { combineReducers } from 'redux'

import productsReducer from "./products";
import userReducer from "./user";
import cartReducer from "./cart";

export default combineReducers({
    products: productsReducer,
    user: userReducer,
    cart: cartReducer,
});
