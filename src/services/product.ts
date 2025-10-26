import axios from "axios";

export interface CreateProductRequest {
    title: string;
    price: number;
    description: string;
    category?: string;
    image?: string;
}

export const getProductList = async () => {
    try {
        const response = await axios.get('https://fakestoreapi.com/products');
        return response.data;
    }
    catch (error) {
        console.error('Error fetching product list:', error);
        throw error;
    }
};

export const createProduct = async (productData: CreateProductRequest) => {
    try {
        const payload = {
            id: 0,
            title: productData.title,
            price: productData.price,
            description: productData.description,
            category: productData.category || 'electronics',
            image: productData.image || 'https://fakestoreapi.com/img/placeholder.jpg'
        };
        
        const response = await axios.post('https://fakestoreapi.com/products', payload);
        return response.data;
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};