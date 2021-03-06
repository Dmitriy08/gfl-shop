import ProductPage from "./pages/ProductPage";
import Admin from "./pages/Admin";
import Cart from "./pages/Cart";
import Shop from "./pages/Shop";
import Auth from "./pages/Auth";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import OrderPage from "./pages/OrderPage";
import {
    ADMIN_ROUTE,
    CART_ROUTE,
    PRODUCT_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    SHOP_ROUTE,
    CHECKOUT_ROUTE, ORDERS_ROUTE
} from "./utils/consts";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: CART_ROUTE,
        Component: Cart
    },
    {
        path: CHECKOUT_ROUTE,
        Component: Checkout
    },

    {
        path: ORDERS_ROUTE,
        Component: Orders
    },
    {
        path: ORDERS_ROUTE + '/:id',
        Component: OrderPage
    },
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: PRODUCT_ROUTE + '/:id',
        Component: ProductPage
    },
]
