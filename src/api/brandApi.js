import axiosClient from './axiosClient';

const brandApi = {
    getAll: (params) => {
        const url = 'api/Brands';
        return axiosClient.get(url,{params})
    },

    get: (id) => {
        const url = `api/Brands/${id}`;
        return axiosClient.get(url)
    },

    post: (brand) => {
        const url = `api/Brands`;
        return axiosClient.post(url,brand)
    },

    put: (brand) => {
        const url = `api/Brands`;
        return axiosClient.put(url,brand)
    },

    delete: (id) => {
        const url = `api/Brands/${id}`;
        return axiosClient.delete(url)
    }
}

export default brandApi;