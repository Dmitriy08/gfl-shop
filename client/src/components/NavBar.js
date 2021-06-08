import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {useHistory} from 'react-router-dom'
import {logOutUser} from '../actions/user'

const NavBar = () => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch()
    const history = useHistory();

    const logOut = () => {
        dispatch(logOutUser())
    }
    return (
            <Navbar bg="dark" variant="dark">
                <Container>
                    <NavLink style={{color:'white'}} to={SHOP_ROUTE}>BuyYourDream</NavLink>
                    {user.isAuth ?
                        <Nav className="ml-auto" style={{color: 'white'}}>
                            {user.isAuth && <span className="mr-2">Hello {user.currentUser.name}</span>}

                            <Button
                                onClick={() => history.push(ADMIN_ROUTE)}
                                variant={"outline-light"}
                            >
                                Dashboard
                            </Button>
                            <Button
                                variant={"outline-light"}
                                onClick={() =>  logOut()}
                                className="ml-2"
                            >
                                Log out
                            </Button>
                        </Nav>
                        :
                        <Nav className="ml-auto" style={{color: 'white'}}>
                            <Button variant={"outline-light"} onClick={() => history.push(LOGIN_ROUTE)}>Sign in</Button>
                        </Nav>
                    }
                </Container>
            </Navbar>
    );
};

export default NavBar;
