import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Image, ListGroup, Row} from "react-bootstrap";
import {useHistory, useParams} from 'react-router-dom'
import ProductsApiService from "../services/products";
import CartApiService from "../services/cart";
import {useSelector} from "react-redux";
import {CART_ROUTE, LOGIN_ROUTE} from "../utils/consts";

const apiHost = process.env.REACT_APP_API_URL;

const ProductPage = () => {
    const user = useSelector(state => state.user);
    const history = useHistory();
    const {id} = useParams()
    const [info, setInfo] = useState({})
    const [options, setOptions] = useState({})

    const [type, setType] = useState(null)
    const [color, setColor] = useState(null)
    const [size, setSize] = useState(null)

    const [product_count, setProductCount] = useState(1)


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

    const clickTypeHandler = (id) => {
        setType(id)
    }

    const clickColorHandler = (id) => {
        setColor(id)
    }

    const clickSizeHandler = (id) => {
        setSize(id)
    }

    const resetOptionsHandler = () => {
        setSize('')
        setColor('')
        setType('')
    }

    const addToCart = async () => {
        if(!user.isAuth){
            history.push(LOGIN_ROUTE)
        }
        const token = localStorage.getItem('token')
        const product = {
            'id_user': token,
            'id_product': info.id_product,
            'id_options': +options.id_options,
            'product_count': +product_count,
            'product_sum': info.product_price
        }
        const response = await CartApiService.addToCart(product)
        let data = await response.json()
        if (!response.ok) {
            console.log(data.message)
        }else{
            history.push(CART_ROUTE)
        }
    }

    const countProduct = (num) => {
        if(num > info.product_count){
            return
        }
        setProductCount(num)
    }
    return (
        <section className="py-5">
            <Container>
                <Row>
                    <Col lg={4}>
                        {info.image_name &&
                        <div className="shadow rounded single-product-image">
                            <Image src={apiHost + info.image_name}/>
                        </div>
                        }
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
                            <input
                                onChange={(e)=>countProduct(+e.target.value)}
                                className="form-control mr-3 number-product"
                                type="number"
                                value={product_count}
                            />
                            <Button
                                onClick={()=> addToCart()}
                                variant="primary"
                                disabled={!type || !size || !color}
                            >
                                Buy Now
                            </Button>
                        </div>
                        <hr/>
                        <h4>Types</h4>
                        <ListGroup horizontal>
                            {
                                options.id_type &&
                                options.id_type.split(',').map((typeId, i) =>
                                    <ListGroup.Item
                                        active={typeId === type}
                                        onClick={() => clickTypeHandler(typeId)}
                                        key={i}
                                    >
                                        {options.type_name.split(',')[i]}
                                    </ListGroup.Item>
                                )
                            }
                            <Button
                                disabled={!type && !size && !color}
                                onClick={() => resetOptionsHandler()}
                                variant={"danger"}
                                className="ml-5"
                            >
                                Reset Options
                            </Button>
                        </ListGroup>
                        <hr/>
                        <h4>Colors</h4>
                        <ListGroup horizontal>
                            {
                                options.id_color &&
                                options.id_color.split(',').map((colorId, i) =>
                                    <ListGroup.Item
                                        key={i}
                                        active={(colorId === color)}
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
