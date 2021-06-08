import React from 'react';
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
