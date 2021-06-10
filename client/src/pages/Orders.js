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
    return (
        <section className="py-5">
            <Container>
                <Row>
                    <Col xl={12}>
                        <h1>Orders: {orders.length}</h1>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Product Price</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                                <th>Details</th>
                            </tr>
                            </thead>
                            <tbody>
                            {orders.map(item =>
                                <tr key={item.id_order}>
                                    <td>
                                        {item.product_name}
                                        &nbsp;<small>({item.type_name},{item.color_name},{item.size_name})</small>
                                    </td>
                                    <td>
                                        {item.product_price} $
                                    </td>
                                    <td>
                                        {item.product_count}
                                    </td>
                                    <td>
                                        {item.product_price * item.product_count} $
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