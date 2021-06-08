const apiHost = process.env.REACT_APP_API_URL;

class ProductsApiService {
    getProducts = async () => await fetch(`${apiHost}api/products`);

    getProduct = async (id, query = null) => await fetch(`${apiHost}api/products/${id}?${query}`)
}
export default new ProductsApiService();
