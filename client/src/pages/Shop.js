import React, {useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import ProductList from "../components/ProductList";
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
        <section className="py-5">
            <Container>
                <Row>
                    <Col className="ml-auto mr-auto" md={9}>
                        {fetchingProducts && <Loader/>}
                        {productsError && <ServerError/>}
                        {!productsError && !fetchingProducts && productList && (
                            <ProductList products={productList}/>
                        )}
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Shop;
