import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {loadCart} from "../actions/cart";
import {Col, Container, Row, Table} from "react-bootstrap";
import Loader from "../components/Loader";
import ServerError from "../components/ServerError";
import {SHOP_ROUTE} from "../utils/consts";
import {NavLink} from "react-router-dom";

const Cart = () => {
    const dispatch = useDispatch();
    const {fetchingCart, cart, cartError} = useSelector(state => state.cart);
    const {msg: cartItems} = cart || {};
    useEffect(() => {
        dispatch(loadCart())
    }, [dispatch])
    console.log(cartItems)
    return (
        <section className="py-5">
            <Container>
                <Row>
                    {fetchingCart && <Loader/>}
                    {cartError && <ServerError/>}
                    {!cartError && !fetchingCart && cartItems && (
                        <Col xl={12}>
                            <h1>Cart: {cartItems.length}</h1>
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
                                {cartItems.map(item =>
                                    <tr key={item.id_cart}>
                                        <td>
                                            {item.product_name}
                                            &nbsp;<small>({item.type_name},{item.color_name},{item.size_name})</small>
                                        </td>
                                        <td>
                                            {item.product_price}
                                        </td>
                                        <td>
                                            {item.product_count}
                                        </td>
                                        <td>
                                            {item.product_price * item.product_count}
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
                </Row>
            </Container>
        </section>
    );
};

export default Cart;
