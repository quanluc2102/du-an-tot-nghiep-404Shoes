import axios from 'axios';

const GET_GIO_HANG_ONE = 'http://localhost:8080/gio-hang-chi-tiet/one';
const UPDATE_GIO_HANG_CHI_TIET = 'http://localhost:8080/gio-hang-chi-tiet/update';
const DELETE_GIO_HANG_CHI_TIET_ONE = 'http://localhost:8080/gio-hang-chi-tiet/delete-one';
const DELETE_GIO_HANG_CHI_TIET_MULTIPLE = 'http://localhost:8080/gio-hang-chi-tiet/delete-multiple';

export const GioHangService = {
    getGHOne: async (id) => {
        const response = await axios.get(`${GET_GIO_HANG_ONE}/${id}`);
        return response.data;
    },

    updateGHCT:async (id,soLuong) =>{
        const response = await axios.put(`${UPDATE_GIO_HANG_CHI_TIET}/${id}?soLuong=${soLuong}`);
        return response.data;
    },

    deleteOne:async (id) =>{
        const response = await axios.delete(`${DELETE_GIO_HANG_CHI_TIET_ONE}/${id}`);
        return response.data;
    },

    deleteMulti:async (list) =>{
        const response = await axios.delete(`${DELETE_GIO_HANG_CHI_TIET_MULTIPLE}`,list);
        return response.data;
    },
};