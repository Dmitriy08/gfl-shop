import jwt_decode from "jwt-decode";
const apiHost = process.env.REACT_APP_API_URL;

class UsersApiService {
    registration = async (name, email, password, phone) => await fetch(`${apiHost}api/user/registration`,{
        method:'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            'name': name,
            'email': email,
            'password': password,
            'phone': phone
        })
    })

    // registration = async (name, email, password, phone) => await fetch(`${apiHost}api/user/registration`,{
    //     method:'POST',
    //     headers: new Headers({
    //         'Content-Type': 'application/json'
    //     }),
    //     body: JSON.stringify({
    //         'name': name,
    //         'email': email,
    //         'password': password,
    //         'phone': phone
    //     })
    // }).then(res => res.json()).then(data => {
    //     console.log(data)
    //     localStorage.setItem('token', data.token)
    //     return jwt_decode(data.token)
    // })

    login = async (email, password) => await fetch(`${apiHost}api/user/login`,{
        method:'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            'email': email,
            'password': password,
        })
    })

    check = async () => {
        return await fetch(`${apiHost}api/user/auth`,{
            headers: new Headers({
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }),
        }).then(res => res.json()).then(data => {
            localStorage.setItem('token', data.token)
            return jwt_decode(data.token)
        });
    }

}
export default new UsersApiService();
