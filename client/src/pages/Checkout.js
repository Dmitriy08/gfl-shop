import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form, Row, Table} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/Loader";
import ServerError from "../components/ServerError";
import {loadCart} from "../actions/cart";
import OrderApiService from '../services/orders'

const Checkout = () => {
    const dispatch = useDispatch();
    const {fetchingCart, cart, cartError} = useSelector(state => state.cart);
    const {msg: cartItems} = cart || {};

    const [deliveryMethod, setDeliveryMethod] = useState([])
    const [paymentMethod, setPaymentMethod] = useState([])

    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [address, setAddress] = useState('')
    const [delivery, setDelivery] = useState([])
    const [payment, setPayment] = useState([])
    const [addInfo, setAddInfo] = useState('')

    useEffect(() => {
        console.log('render')
        async function fetchData() {
            const response = await OrderApiService.getCheckoutInfo();
            const data = await response.json()
            if (!response.ok) {
                console.log('error')
            } else {
                setDeliveryMethod(data.delivery_method)
                setPaymentMethod(data.payment_method)
            }
        }
        fetchData();
        dispatch(loadCart())
    }, [dispatch])
    console.log(country)
    console.log(city)
    console.log(address)
    console.log(delivery)
    console.log(payment)
    console.log(addInfo)
    const totalPrice = () => {
        return cartItems.reduce((sum, product) => sum + product.product_price * product.product_count, 0).toFixed(2);
    }

    const placeOrder = () => {
        // const order = {
        //
        // }
    }

    return (
        <section className="py-5">
            <Container>
                <Row>
                    <Col lg={8}>
                        <h2>Billing Details</h2>
                        <Form>
                            <Form.Group>
                                <Form.Label>Country</Form.Label>
                                <Form.Control onChange={(e)=> setCountry(e.target.value)} type="text" placeholder="Country"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>City</Form.Label>
                                <Form.Control onChange={(e)=> setCity(e.target.value)} type="text" placeholder="City"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" onChange={(e)=> setAddress(e.target.value)} placeholder="Address"/>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>Delivery</Form.Label>
                                <Form.Control as="select" onChange={(e)=> setDelivery(e.target.value)}>
                                    {deliveryMethod.map(item=>(
                                        <option key={item.id}>{item.name}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>Payment method</Form.Label>
                                <Form.Control onChange={(e)=> setPayment(e.target.value)} as="select">
                                    {paymentMethod.map(item=>(
                                        <option key={item.id}>{item.name}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Additional Information</Form.Label>
                                <Form.Control onChange={(e)=> setAddInfo(e.target.value)} as="textarea" rows={3} placeholder="Additional Information"/>
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
                                <tr key={item.id_cart}>
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
                            <Button onClick={() => {placeOrder()}}>Place Order</Button>
                        </Col>
                    )}

                </Row>
            </Container>
        </section>
    );
};

export default Checkout;
