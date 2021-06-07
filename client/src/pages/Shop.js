import React, {useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import CategoryBar from "../components/CategoryBar";
import ProductList from "../components/ProductList";
import TypeBar from "../components/TypeBar";
import {loadProducts} from "../actions/products";
import Loader from "../components/Loader";
import ServerError from "../components/ServerError";

const Shop = () => {
    const dispatch = useDispatch();
    const {fetchingProducts, products, productsError} = useSelector(state => state.products);
    const {msg: productList} = products || {};

    useEffect( () => {
        dispatch(loadProducts())
    }, [dispatch])

    return (
        <Container>
            <Row>
                <Col md={3}>
                    <CategoryBar/>
                </Col>
                <Col md={9}>
                    <TypeBar/>
                    {fetchingProducts && <Loader/>}
                    {productsError && <ServerError/>}
                    {!productsError && !fetchingProducts && productList && (
                        <ProductList products={productList}/>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Shop;
