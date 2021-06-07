const apiHost = process.env.REACT_APP_API_URL;

class ProductsApiService {
    getProducts = async () => await fetch(`${apiHost}api/products`);
}
export default new ProductsApiService();
