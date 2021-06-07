import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import CategoryBar from "../components/CategoryBar";
import ProductList from "../components/ProductList";
import TypeBar from "../components/TypeBar";

const Shop = () => {
    const {products} = useSelector(state => state.products);
    console.log(products)

    const dispatch = useDispatch()
    return (
        <Container>
            <Row>
                <Col md={3}>
                    <CategoryBar/>
                </Col>
                <Col md={9}>
                    <TypeBar/>
                    <ProductList/>
                </Col>
            </Row>
        </Container>
    );
};

export default Shop;
