const apiHost = process.env.REACT_APP_API_URL;

class OrderApiService {
    getCheckoutInfo = async () => await fetch(`${apiHost}api/order/checkout`)
}
export default new OrderApiService();
