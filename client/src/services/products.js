const apiHost = process.env.REACT_APP_SW_API_HOST;

class ProductsApiService {
    getProducts = async page => fetch(`${apiHost}/people/?page=${page}`);

    getProduct = async id => fetch(`${apiHost}/people/${id}/`);
}
export default new ProductsApiService();