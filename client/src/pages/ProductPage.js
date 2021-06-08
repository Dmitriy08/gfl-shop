import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Image, ListGroup, Row} from "react-bootstrap";
import {useParams} from 'react-router-dom'
import ProductsApiService from "../services/products";
const apiHost = process.env.REACT_APP_API_URL;

const ProductPage = () => {
    const {id} = useParams()
    const [info, setInfo] = useState({})
    const [options, setOptions] = useState({})

    useEffect(() => {
        async function fetchData() {
            const response = await ProductsApiService.getProduct(id);
            const data = await response.json()
            if (!response.ok) {
                console.log('ERRRRROR', data)
            } else {
                setInfo(data.info)
                setOptions(data.options)
            }
        }
        fetchData();
    }, [id]);

    console.log('info', info)
    console.log('options', options)
    return (
        <section className="py-5">
            <Container>
                <Row>
                    <Col lg={4}>
                        <Image src={apiHost + info.image_name}/>
                    </Col>
                    <Col>
                        <h2>{info.product_name}</h2>
                        <p><strong>Category: </strong>{info.category_name}</p>
                        <p><strong>Structure: </strong>{info.structure_name}</p>
                        <p>
                            {info.product_description}
                        </p>
                        <div className="d-flex align-items-center">
                            <div className="price mr-5">
                                {info.product_price} <span>$</span>
                            </div>
                            <Button variant="primary">Buy Now</Button>
                        </div>
                        <hr/>
                        <h4>Types</h4>
                        <ListGroup horizontal>
                            {
                                info.type_name &&
                                info.type_name.split(',').map((type, i) =>
                                    <ListGroup.Item key={i}>{type}</ListGroup.Item>)
                            }
                        </ListGroup>
                        <hr/>
                        <h4>Colors</h4>
                        <ListGroup horizontal>
                            {
                                options.color_name &&
                                options.color_name.split(',').map((type, i) => <ListGroup.Item
                                    key={i}>{type}</ListGroup.Item>)
                            }
                        </ListGroup>
                        <hr/>
                        <h4>Sizes</h4>
                        <ListGroup horizontal>
                            {
                                options.size_name &&
                                options.size_name.split(',').map((type, i) => <ListGroup.Item
                                    key={i}>{type}</ListGroup.Item>)
                            }
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default ProductPage;
