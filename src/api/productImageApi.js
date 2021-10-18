import axiosClient from './axiosClient';

const productImageApi = {
    getAll: (params) => {
        const url = 'api/ProductImages';
        return axiosClient.get(url,{params})
    },

    get: (id) => {
        const url = `api/ProductImages/${id}`;
        return axiosClient.get(url)
    },

    getByProductId: (id) => {
        const url = `/api/ProductImages/GetImageOfProduct/${id}`;
        return axiosClient.get(url)
    },

    getAddEdit: (id) => {
        const url = `api/ProductImages/AddEditProduct/${id}`;
        return axiosClient.get(url)
    },

    post: (product) => {
        const url = `api/ProductImages`;
        return axiosClient.post(url,product)
    },

    put: (product) => {
        const url = `api/ProductImages`;
        return axiosClient.put(url,product)
    },

    delete: (id,publicId) => {
        const url = `api/ProductImages/${id}/${publicId}`;
        return axiosClient.delete(url)
    }
}

export default productImageApi;