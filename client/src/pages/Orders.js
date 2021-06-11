import React, {useEffect, useState} from 'react';
import OrderApiService from "../services/orders";
import {Button, Col, Container, Row, Table} from "react-bootstrap";
import {ORDERS_ROUTE} from "../utils/consts";
import {useHistory} from "react-router-dom";

const Orders = () => {
    const [orders, setOrders] = useState([])
    const history = useHistory()
    useEffect(() => {
        async function fetchData() {
            const token = localStorage.getItem('token')
            const response = await OrderApiService.getOrders(token);
            const data = await response.json()
            if (!response.ok) {
                console.log('error')
            }else{
                setOrders(data)
            }
        }
        fetchData();
    }, [])

    const convertDate = (dateISO) =>{
        const date = new Date(dateISO);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    }

    return (
        <section className="py-5">
            <Container>
                <Row>
                    <Col xl={12}>
                        <h1>Orders: {orders.length}</h1>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Date of order</th>
                                <th>Payment method</th>
                                <th>Delivery method</th>
                                <th>Status</th>
                                <th>Total price</th>
                                <th>Details</th>
                            </tr>
                            </thead>
                            <tbody>
                            {orders.length === 0 && (
                                <tr>
                                    <td colSpan={7}>
                                        <strong>You orders is empty</strong>
                                    </td>
                                </tr>
                            )}
                            {orders.map((item, index) =>
                                <tr key={item.id_order}>
                                    <td>
                                        {index+1}
                                    </td>
                                    <td>
                                        {convertDate(item.date_of_order)}
                                    </td>
                                    <td>
                                        {item.name_payment_method}
                                    </td>
                                    <td>
                                        {item.name_delivery}
                                    </td>
                                    <td>
                                        {item.name_order_status}
                                    </td>
                                    <td>
                                        {item.order_full_price} $
                                    </td>
                                    <td>
                                        <Button
                                            onClick={() => history.push(ORDERS_ROUTE + '/' + item.id_order)}
                                            variant="primary"
                                        >Order Details</Button>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Orders;
