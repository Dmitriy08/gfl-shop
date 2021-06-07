import React from 'react';
import {ListGroup} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {activeCategory} from "../actions/products";

const CategoryBar = () => {
    const {categories} = useSelector(state => state.products);
    const {selectedCategory} = useSelector(state => state.products);
    const dispatch = useDispatch()
    return (
        <ListGroup>
            {categories.map(category =>
                <ListGroup.Item
                    active={category.id_category === selectedCategory.id_category}
                    style={{cursor: 'pointer'}}
                    key={category.id_category}
                    onClick={() => dispatch(activeCategory(category))}
                >
                    {category.category_name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
};

export default CategoryBar;
