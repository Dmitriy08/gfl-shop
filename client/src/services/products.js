// const apiHost = process.env.REACT_APP_API_URL;

class ProductsApiService {
    getProducts = async () => await fetch(`http://localhost:3010/api/products`);
}
export default new ProductsApiService();
