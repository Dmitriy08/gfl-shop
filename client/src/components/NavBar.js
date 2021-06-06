import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {SHOP_ROUTE} from "../utils/consts";
import {useHistory} from 'react-router-dom'
import {setUser} from '../actions/user'

const NavBar = () => {
    const user = useSelector(state => state.user);

    const dispatch = useDispatch()
    const history = useHistory();

    const Auth = () => {
        dispatch(setUser(true))
    }
    return (
            <Navbar bg="dark" variant="dark">
                <Container>
                    <NavLink style={{color:'white'}} to={SHOP_ROUTE}>КупиДевайс</NavLink>
                    {user.isAuth ?
                        <Nav className="ml-auto" style={{color: 'white'}}>
                            <Button
                                variant={"outline-light"}
                            >
                                Dashboard
                            </Button>
                            <Button
                                variant={"outline-light"}
                                // onClick={() => logOut()}
                                className="ml-2"
                            >
                                Sign out
                            </Button>
                        </Nav>
                        :
                        <Nav className="ml-auto" style={{color: 'white'}}>
                            <Button variant={"outline-light"} onClick={Auth}>Sign in</Button>
                        </Nav>
                    }
                </Container>
            </Navbar>
    );
};

export default NavBar;