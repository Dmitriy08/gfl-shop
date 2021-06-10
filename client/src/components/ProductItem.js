import React from 'react';
import {PRODUCT_ROUTE} from "../utils/consts";
import {Button, Card, Col} from "react-bootstrap";
import {useHistory} from "react-router-dom"
const apiHost = process.env.REACT_APP_API_URL;

const ProductItem = ({product}) => {
    const history = useHistory()
    return (
        <Col md={4} className={"mt-3"}>
            <Card className="shadow rounded">
                <Card.Img style={{cursor: 'pointer'}}  variant="top" src={apiHost + product.image_name} onClick={() => history.push(PRODUCT_ROUTE + '/' + product.id_product)}/>
                <Card.Body>
                    <Card.Title style={{cursor: 'pointer'}} onClick={() => history.push(PRODUCT_ROUTE + '/' + product.id_product)}>{product.product_name}</Card.Title>
                    <Card.Text>
                        {product.product_price} $
                    </Card.Text>
                    <Button onClick={() => history.push(PRODUCT_ROUTE + '/' + product.id_product)} variant="primary">Select Options</Button>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default ProductItem;
