import React from 'react';
import {ListGroup} from "react-bootstrap";
import {useSelector} from "react-redux";

const CategoryBar = () => {
    const {categories} = useSelector(state => state.products);
    return (
        <ListGroup>
            {categories.map(category =>
                <ListGroup.Item
                    style={{cursor: 'pointer'}}
                    key={category.id_category}
                >
                    {category.category_name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
};

export default CategoryBar;