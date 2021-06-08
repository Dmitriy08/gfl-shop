import {BrowserRouter} from 'react-router-dom'
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {setUser} from "./actions/user";
import UsersApiService from "./services/users";
import {Spinner} from "react-bootstrap";

function App() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        UsersApiService.check().then(data => {
            dispatch(setUser(data))
        }).catch(e =>  localStorage.removeItem('token')).finally(() => setLoading(false))
    }, [dispatch])

    if (loading) {
        return <Spinner animation={"grow"}/>
    }
    return (
        <BrowserRouter>
            <NavBar/>
            <AppRouter/>
        </BrowserRouter>
    );
}

export default App;
