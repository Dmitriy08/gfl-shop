import React, {useState} from 'react';
import jwt_decode from "jwt-decode";
import {Button, Card, Container, Form} from "react-bootstrap";
import {NavLink, useHistory, useLocation} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import UsersApiService from "../services/users"
import {useDispatch} from "react-redux";
import {setUser} from "../actions/user";
import ServerError from "../components/ServerError";


const Auth = () => {
    const location = useLocation();
    const history = useHistory();
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const dispatch = useDispatch()


    const [error, setError] = useState('')

    const click = async () => {
        let data
        if (isLogin) {
            data = await UsersApiService.login(email, password) //check this
            const response = await UsersApiService.login(email, password)
            data = await response.json()
            if (!response.ok) {
                setError(data.message)
            }else{
                localStorage.setItem('token', data.token)
                const decodeToken = jwt_decode(data.token)
                dispatch(setUser(decodeToken))
                history.push(SHOP_ROUTE)
            }
        } else {
            const response = await UsersApiService.registration(name, email, password, phone)
            data = await response.json()
            if (!response.ok) {
                setError(data.message)
            }else{
                localStorage.setItem('token', data.token)
                const decodeToken = jwt_decode(data.token)
                console.log(decodeToken)
                dispatch(setUser(decodeToken))
                history.push(SHOP_ROUTE)
            }
        }
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Log In' : "Registration"}</h2>
                {error !== '' &&
                <ServerError message={error}/>
                }
                <Form className="d-flex flex-column">
                    {!isLogin &&
                    <Form.Control
                        className="mt-3"
                        placeholder="Enter your name..."
                        value={name}
                        onChange={event => setName(event.target.value)}
                    />
                    }

                    <Form.Control
                        className="mt-3"
                        placeholder="Enter your email..."
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Enter your password..."
                        type="password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />

                    {!isLogin &&
                    <Form.Control
                        className="mt-3"
                        placeholder="Enter your phone..."
                        value={phone}
                        onChange={event => setPhone(event.target.value)}
                    />
                    }

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
                    <Button
                        variant={"outline-success"}
                        onClick={click}
                    >
                        {isLogin ? 'Sign In' : 'Registration'}
                    </Button>
                </Form>
            </Card>
        </Container>
    );
};

export default Auth;
