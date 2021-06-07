import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Card, Row} from "react-bootstrap";
import {activeType} from "../actions/products";

const TypeBar = () => {
    const {types} = useSelector(state => state.products);
    const {selectedType} = useSelector(state => state.products);
    const dispatch = useDispatch()
    return (
        <Row>
            {types.map(type=>
                <Card
                    style={{cursor: 'pointer'}}
                    border={type.id_type === selectedType.id_type ? 'danger' : 'light'}
                    key={type.id_type}
                    className="p-3"
                    onClick={() => dispatch(activeType(type))}
                >
                    {type.type_name}
                </Card>
            )}
        </Row>
    );
};

export default TypeBar;
