const apiHost = process.env.REACT_APP_API_URL;

class OrderApiService {
    getCheckoutInfo = async () => await fetch(`${apiHost}api/order/checkout`)
    addToOrder = async (cart) => await fetch(`${apiHost}api/order/add`, {
        method:'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(cart)
    });
    getOrders = async () => await fetch(`${apiHost}api/order/get`)
    getProduct = async (id) => await fetch(`${apiHost}api/products/${id}`)
}
export default new OrderApiService();
