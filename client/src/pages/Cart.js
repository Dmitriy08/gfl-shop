import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addItemToCart, loadCart, subItemToCart} from "../actions/cart";
import {Button, Col, Container, Row, Table} from "react-bootstrap";
import Loader from "../components/Loader";
import ServerError from "../components/ServerError";
import {CHECKOUT_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {NavLink} from "react-router-dom";
import CartApiService from "../services/cart";

const Cart = () => {
    const dispatch = useDispatch();
    const {fetchingCart, cart, cartError} = useSelector(state => state.cart);

    useEffect(() => {
        dispatch(loadCart())
    }, [dispatch])

    const addItem = async (index) => {
        const token = localStorage.getItem('token')
        if (cart){

            const product = {
                'id_user': token,
                'id_product': cart[index].id_product,
                'id_options': cart[index].id_options,
                'product_count': 1,
                'product_sum': cart[index].product_price
            }
            const response = await CartApiService.addToCart(product)

            let data = await response.json()
            if (!response.ok) {
                console.log(data.message)
            }else{
                dispatch(addItemToCart(index))
            }
        }
    }

    const subItem = async (index) => {
        const token = localStorage.getItem('token')
        if (cart){

            const product = {
                'id_user': token,
                'id_product': cart[index].id_product,
                'id_options': cart[index].id_options,
                'product_count': -1,
                'product_sum': cart[index].product_price
            }
            const response = await CartApiService.addToCart(product)

            let data = await response.json()
            if (!response.ok) {
                console.log(data.message)
            }else{
                dispatch(subItemToCart(index))
            }
        }
    }

    return (
        <section className="py-5">
            <Container>
                <Row>
                    {fetchingCart && <Loader/>}
                    {cartError && <ServerError/>}

                    {!cartError && !fetchingCart && cart && (
                        <Col xl={12}>
                            <h1>Cart: {cart.length}</h1>
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Product Price</th>
                                    <th>Quantity</th>
                                    <th>Subtotal</th>
                                </tr>
                                </thead>
                                <tbody>
                                {cart.length === 0 && (
                                    <tr>
                                        <td colSpan={4}>
                                            <strong>You cart is empty</strong>
                                        </td>
                                    </tr>
                                )}
                                {cart.map((item, index) =>
                                    <tr key={item.id_cart}>
                                        <td>
                                            {item.product_name}
                                            &nbsp;<small>({item.type_name},{item.color_name},{item.size_name})</small>
                                        </td>
                                        <td>
                                            {item.product_price} $
                                        </td>
                                        <td>
                                            <Button
                                                onClick={()=>subItem(index)}
                                                className="mr-2"
                                                variant={'primary'}
                                            >-</Button>
                                            {item.product_count}
                                            <Button
                                            onClick={()=>addItem(index)}
                                                className="ml-2"
                                                variant={'primary'}
                                            >+</Button>
                                        </td>
                                        <td>
                                            {item.product_price * item.product_count} $
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </Table>
                        </Col>
                    )}
                    <Col lg={6}>
                        <NavLink className="btn btn-primary" to={SHOP_ROUTE}>Go Back To Shop</NavLink>
                    </Col>
                    <Col lg={6} className="text-right">
                        {cart.length !== 0 && (
                            <NavLink className="btn btn-primary" to={CHECKOUT_ROUTE}>Proceed To Checkout</NavLink>
                        )}

                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Cart;
