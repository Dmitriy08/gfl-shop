import React from 'react';
import {PRODUCT_ROUTE} from "../utils/consts";
import {Card, Col, Image} from "react-bootstrap";
import {useHistory} from "react-router-dom"

const ProductItem = ({product}) => {
    const history = useHistory()
    return (
        <Col md={3} className={"mt-3"} onClick={() => history.push(PRODUCT_ROUTE + '/' + product.id_product)}>
            <Card style={{width: 150, cursor: 'pointer'}} border={"light"}>

                <div>{product.product_name}</div>
            </Card>
        </Col>
    );
};

export default ProductItem;