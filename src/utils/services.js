import axios from "axios";

const getProductList = (params) => {
    return axios.get("/api/products", {params: params});
}

const getProductDetail = (id) => {
    return axios.get(`/api/product/${id}`);
}

const getCart = () => {
    return axios.get(`/api/cart`);
}

const addCart = (params) => {
    return axios.post(`/api/cart/addItem`, {params: params});
}

const deleteItem = (id) => {
    return axios.delete(`/api/cart/deleteItem/${id}`);
}

const updateCart = (id, value) => {
    return axios.post(`/api/cart/updateItem/${id}`, {params: {newVal: value}});
}

export {
    getProductList,
    getProductDetail,
    getCart,
    addCart,
    deleteItem,
    updateCart
}