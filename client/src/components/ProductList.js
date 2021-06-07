import React from 'react';
import {useSelector} from "react-redux";
import {Row} from "react-bootstrap";
import ProductItem from "./ProductItem";

const ProductList = ({products}) => {
    return (
        <Row className="d-flex">
            {products.map(product =>
                <ProductItem key={product.id_product} product={product}/>
            )}
        </Row>
    );
};

export default ProductList;
