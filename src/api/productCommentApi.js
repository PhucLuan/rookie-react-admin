import axiosClient from "./axiosClient";

const productApi = {
    // getAllbyProduct: (id) => {
    //     const url = 'api/Products/GetAllCommentsByProduct';
    //     return axiosClient.get(url,id)
    // },

    getAllbyProduct: (id) => {
        const url = `api/Products/GetAllCommentsByProduct/${id}`;
        return axiosClient.get(url)
    },

    // getAddEdit: (id) => {
    //     const url = `api/Products/AddEditProduct/${id}`;
    //     return axiosClient.get(url)
    // },

    // find: (filter)=>{
    //     const url = `api/Products/find`;
    //     return axiosClient.post(url,filter)
    // },
    // getFilter: () => {
    //     const url = `api/Products/GetFilterProductAsync`;
    //     return axiosClient.get(url)
    // },
    // post: (product) => {
    //     const url = `api/Products`;
    //     return axiosClient.post(url,product)
    // },

    // put: (product) => {
    //     const url = `api/Products`;
    //     return axiosClient.put(url,product)
    // },

    // delete: (id) => {
    //     const url = `api/Products/${id}`;
    //     return axiosClient.delete(url)
    // }
}

export default productApi;