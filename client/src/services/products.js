const apiHost = process.env.REACT_APP_API_URL;

class ProductsApiService {
    getProducts = async () => await fetch(`${apiHost}api/products`);

    getProduct = async (id) => await fetch(`${apiHost}api/products/${id}`)
}
export default new ProductsApiService();
