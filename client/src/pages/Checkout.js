import React, {useEffect} from 'react';
import {Button, Col, Container, Form, Row, Table} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/Loader";
import ServerError from "../components/ServerError";
import {loadCart} from "../actions/cart";

const Checkout = () => {
    const dispatch = useDispatch();
    const {fetchingCart, cart, cartError} = useSelector(state => state.cart);
    const {msg: cartItems} = cart || {};
    useEffect(() => {
        dispatch(loadCart())
    }, [dispatch])

    const totalPrice = () => {
        return cartItems.reduce((sum, good) => sum + good.product_price * good.product_count, 0).toFixed(2);
    }
    return (
        <section className="py-5">
            <Container>
                <Row>
                    <Col lg={8}>
                        <h2>Dilling Details</h2>
                        <Form>
                            <Form.Group>
                                <Form.Label>Country</Form.Label>
                                <Form.Control type="text" placeholder="Country"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>City</Form.Label>
                                <Form.Control type="text" placeholder="City"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" placeholder="Address"/>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>Delivery</Form.Label>
                                <Form.Control as="select">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>Payment method</Form.Label>
                                <Form.Control as="select">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Additional Information</Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder="Additional Information"/>
                            </Form.Group>
                        </Form>
                    </Col>

                    {fetchingCart && <Loader/>}
                    {cartError && <ServerError/>}
                    {!cartError && !fetchingCart && cartItems && (
                        <Col lg={4}>
                            <h2>You Order</h2>
                            <Table striped bordered hover className="shadow">
                                <thead>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Subtotal</th>
                                </tr>
                                </thead>
                                <tbody>
                                {cartItems.map(item =>
                                <tr>
                                    <td>
                                        {item.product_name}
                                        &nbsp;<small>({item.type_name},{item.color_name},{item.size_name})</small>
                                        x
                                        {item.product_count}
                                    </td>
                                    <td>
                                        {item.product_price * item.product_count} $
                                    </td>
                                </tr>
                                )}
                                </tbody>
                                <tfoot>
                                <tr>
                                    <th>
                                        Total
                                    </th>
                                    <td>
                                        {totalPrice()} $
                                    </td>
                                </tr>
                                </tfoot>
                            </Table>
                            <Button>Place Order</Button>
                        </Col>
                    )}

                </Row>
            </Container>
        </section>
    );
};

export default Checkout;
