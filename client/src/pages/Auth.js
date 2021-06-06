import React from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";
import {NavLink, useLocation} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";

const Auth = () => {
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE
    return (
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{height: window.innerHeight - 54}}
            >
                <Card style={{width: 600}} className="p-5">
                    <h2 className="m-auto">{isLogin ? 'Log In' : "Registration"}</h2>
                    <Form className="d-flex flex-column">
                        <Form.Control
                            className="mt-3"
                            placeholder="Enter your email..."
                        />
                        <Form.Control
                            className="mt-3"
                            placeholder="Enter your password..."
                            type="password"
                        />
                        <div className="">
                            {isLogin ?
                                <div>
                                    You don't have account? <NavLink to={REGISTRATION_ROUTE}>Registration</NavLink>
                                </div>
                                :
                                <div>
                                    You have account? <NavLink to={LOGIN_ROUTE}>Sign In!</NavLink>
                                </div>
                            }
                        </div>
                        <Button  variant={"outline-success"}>{isLogin ? 'Sign In' : 'Registration'}</Button>
                    </Form>
                </Card>
            </Container>
    );
};

export default Auth;