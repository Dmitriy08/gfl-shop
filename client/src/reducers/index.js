import { combineReducers } from 'redux'

import productsReducer from "./products";
import userReducer from "./user";

export default combineReducers({
    products: productsReducer,
    user: userReducer,
});