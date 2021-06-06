import { useEffect, useState } from 'react';
import apiService from '../services/products';

const useProduct = id => {
    const [info, setInfo] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const info = await apiService.getProduct(id).then(res => res.json());

                setInfo(info);
            } catch {}
        })();
    }, [id]);

    return info;
};

export default useProduct;