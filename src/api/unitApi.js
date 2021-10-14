import axiosClient from './axiosClient';

const unitApi = {
    getAll: (params) => {
        const url = 'api/Units';
        return axiosClient.get(url,{params})
    },

    get: (id) => {
        const url = `api/Units/${id}`;
        return axiosClient.get(url)
    },

    post: (unit) => {
        const url = `api/Units`;
        return axiosClient.post(url,unit)
    },

    put: (unit) => {
        const url = `api/Units`;
        return axiosClient.put(url,unit)
    },

    delete: (id) => {
        const url = `api/Units/${id}`;
        return axiosClient.delete(url)
    }
}

export default unitApi;