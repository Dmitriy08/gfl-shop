const apiHost = process.env.REACT_APP_API_URL;

class CartApiService {
    getCart = async (token) => await fetch(`${apiHost}api/cart/get?token=${token}`);
    addToCart = async (product) => await fetch(`${apiHost}api/cart/add`, {
        method:'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(product)
    });
}
export default new CartApiService();
