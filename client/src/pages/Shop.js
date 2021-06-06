import React from 'react';
import {Col, Container, Row} from "react-bootstrap";

const Shop = () => {
    return (
        <Container>
            <Row>
                <Col md={3}>
side bar
                </Col>
                <Col md={9}>
shop items
                </Col>
            </Row>
        </Container>
    );
};

export default Shop;