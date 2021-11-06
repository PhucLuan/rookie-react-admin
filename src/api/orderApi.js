import axiosClient from './axiosClient';

const orderApi = {
    find: (filter)=>{
        const url = `api/Orders/find`;
        return axiosClient.post(url,filter)
    },
    getOrderDetail: (id) => {
        const url = `api/Orders/Orderdetail/${id}`;
        return axiosClient.get(url)
    },
}

export default orderApi;