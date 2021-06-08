import React from 'react';
import {PRODUCT_ROUTE} from "../utils/consts";
import {Button, Card, Col} from "react-bootstrap";
import {useHistory} from "react-router-dom"

const ProductItem = ({product}) => {
    const history = useHistory()
    return (
        <Col md={4} className={"mt-3"}>
            <Card border={"dark"}>
                <Card.Img style={{cursor: 'pointer'}}  variant="top" src="holder.js/100px180" onClick={() => history.push(PRODUCT_ROUTE + '/' + product.id_product)}/>
                <Card.Body>
                    <Card.Title style={{cursor: 'pointer'}} onClick={() => history.push(PRODUCT_ROUTE + '/' + product.id_product)}>{product.product_name}</Card.Title>
                    <Card.Text>
                        {product.product_price}
                    </Card.Text>
                    <Button variant="primary">Buy Now</Button>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default ProductItem;
