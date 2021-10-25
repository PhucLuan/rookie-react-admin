import axiosClient from "./axiosClient";

const userApi = {
    getAll: () => {
        const url = 'api/Users';
        return axiosClient.get(url)
    },
}

export default userApi;