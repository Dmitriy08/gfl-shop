import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Image, ListGroup, Row} from "react-bootstrap";
import {useParams} from 'react-router-dom'
import ProductsApiService from "../services/products";

const apiHost = process.env.REACT_APP_API_URL;

const ProductPage = () => {
    const {id} = useParams()
    const [info, setInfo] = useState({})
    const [options, setOptions] = useState({})

    const [type, setType] = useState(null)
    const [color, setColor] = useState(null)
    const [size, setSize] = useState(null)

    useEffect(() => {
        async function fetchData() {
            console.log('render')
            let query = ''
            if (type) query += `type=${type}&`;
            if (color) query += `color=${color}&`;
            if (size) query += `size=${size}`;
            const response = await ProductsApiService.getProduct(id, query);
            const data = await response.json()
            if (!response.ok) {
                console.log('ERRRRROR', data)
            } else {
                setInfo(data.info)
                setOptions(data.options)
            }
        }

        fetchData();
    }, [id, type, color, size]);

    // console.log('info', info)
    // console.log('options', options)

    const clickTypeHandler = (id) => {
        // console.log('TYPE_ID', id)
        setType(id)
    }

    const clickColorHandler = (id) => {
        // console.log('COLOR_ID', id)
        setColor(id)
    }

    const clickSizeHandler = (id) => {
        // console.log('SIZE_ID', id)
        setSize(id)
    }

    return (
        <section className="py-5">
            <Container>
                <Row>
                    <Col lg={4}>
                        {info.image_name &&
                        <Image src={apiHost + info.image_name}/>
                        }

                    </Col>
                    <Col>
                        <h5>Type: {type}</h5>
                        <h5>Color: {color}</h5>
                        <h5>Size: {size}</h5>
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
                                info.id_type &&
                                info.id_type.split(',').map((typeId, i) =>
                                    <ListGroup.Item
                                        active={typeId === type}
                                        onClick={() => clickTypeHandler(typeId)}
                                        key={i}
                                    >
                                        {info.type_name.split(',')[i]}
                                    </ListGroup.Item>)
                            }
                        </ListGroup>
                        <hr/>
                        <h4>Colors</h4>
                        <ListGroup horizontal>
                            {
                                options.id_color &&
                                options.id_color.split(',').map((colorId, i) =>
                                    <ListGroup.Item
                                        key={i}
                                        active={!(colorId === color)}
                                        style={{backgroundColor: options.color_code.split(',')[i]}}
                                        onClick={() => clickColorHandler(colorId)}
                                    >
                                        {options.color_name.split(',')[i]}
                                    </ListGroup.Item>)
                            }
                        </ListGroup>
                        <hr/>
                        <h4>Sizes</h4>
                        <ListGroup horizontal>
                            {
                                options.id_size &&
                                options.id_size.split(',').map((sizeId, i) =>
                                    <ListGroup.Item
                                        active={sizeId === size}
                                        key={i}
                                        onClick={() => clickSizeHandler(sizeId)}
                                    >
                                        {options.size_name.split(',')[i]}
                                    </ListGroup.Item>)
                            }
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default ProductPage;
