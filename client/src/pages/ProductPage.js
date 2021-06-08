import React, {useEffect, useState} from 'react';
import {Col, Container} from "react-bootstrap";
import {useParams} from 'react-router-dom'
import ProductsApiService from "../services/products";
import UsersApiService from "../services/users";
import {loadProduct} from "../actions/products";

const ProductPage = () => {
    const {id} = useParams()
    const [info, setInfo] = useState({})
    const [options, setOptions] = useState({})

    useEffect(async () => {
        console.log('render')
        const response = await ProductsApiService.getProduct(id)
        const data = await response.json()
        if (!response.ok) {
            console.log('ERRRRROR', data)
        }else{
            setInfo(data.info)
            setOptions(data.options)
        }
    }, [])

    return (
        <Container>
            <Col>
                {info.product_name}
                {options.color_name}
            </Col>
        </Container>
    );
};

export default ProductPage;
