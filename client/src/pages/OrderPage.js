import React, {useEffect, useState} from 'react';
import OrdersApiService from "../services/orders";
import {NavLink, useParams} from "react-router-dom";
import {Col, Container, Row, Table} from "react-bootstrap";
import {useSelector} from "react-redux";
import {ORDERS_ROUTE} from "../utils/consts";

const OrderPage = () => {
    const {id} = useParams()
    const [order, setOrder] = useState({})
    const user = useSelector(state => state.user);
    useEffect(() => {
        async function fetchData() {
            const response = await OrdersApiService.getOrder(id);
            const data = await response.json()
            if (!response.ok) {
                console.log('ERRRRROR', data)
            } else {
                setOrder(data)
            }
        }
        fetchData();
    }, [id]);

    const convertDate = (dateISO) =>{
        const date = new Date(dateISO);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    }
    console.log(order)
    return (
    <section className="py-5">
        <Container>
            <Row>
                <Col lg={12}>
                    <h2>Order #{order.id_order}</h2>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>
                                User Name
                            </th>
                            <td>
                                {user.isAuth && user.currentUser.name}
                            </td>
                        </tr>

                        <tr>
                            <th>
                                Date Of Order
                            </th>
                            <td>
                                {convertDate(order.date_of_order)}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Order Status
                            </th>
                            <td>
                                {order.name_order_status}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Order Full Price
                            </th>
                            <td>
                                {order.order_full_price} $
                            </td>
                        </tr>

                        <tr>
                            <th>
                                Country
                            </th>
                            <td>
                                {order.country}
                            </td>
                        </tr>

                        <tr>
                            <th>
                                City
                            </th>
                            <td>
                                {order.city}
                            </td>
                        </tr>
                        <tr>
                            <th>
                               Address
                            </th>
                            <td>
                                {order.address}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Delivery
                            </th>
                            <td>
                                {order.name_delivery}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Comments
                            </th>
                            <td>
                                {order.order_comments}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Payment
                            </th>
                            <td>
                                {order.name_payment_method}
                            </td>
                        </tr>
                        </thead>
                    </Table>
                </Col>
                <Col lg={6}>
                    <NavLink className="btn btn-primary" to={ORDERS_ROUTE}>Go Back To Orders</NavLink>
                </Col>
            </Row>
        </Container>
    </section>
    );
};

export default OrderPage;
