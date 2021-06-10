import React, {useEffect, useState} from 'react';
import OrdersApiService from "../services/orders";
import {useParams} from "react-router-dom";
import {Table} from "react-bootstrap";

const OrderPage = () => {
    const {id} = useParams()
    const [order, setOrder] = useState({})
    useEffect(() => {
        async function fetchData() {
            console.log()
            const response = await OrdersApiService.getOrder(id);
            const data = await response.json()
            if (!response.ok) {
                console.log('ERRRRROR', data)
            } else {
                setOrder(data)
                console.log(order)
            }
        }
        fetchData();
    }, [id]);
    return (
        <Table>
            OrderPage
        </Table>
    );
};

export default OrderPage;