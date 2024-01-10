import axios from 'axios';

const GET_GIO_HANG_ONE = 'http://localhost:8080/gio-hang-chi-tiet/one';
const GET_DC_BY_TAI_KHOAN = 'http://localhost:8080/dia_chi/getDCByTaiKhoan';
const UPDATE_GIO_HANG_CHI_TIET = 'http://localhost:8080/gio-hang-chi-tiet/update';
const DELETE_GIO_HANG_CHI_TIET_ONE = 'http://localhost:8080/gio-hang-chi-tiet/delete-one';
const DELETE_GIO_HANG_CHI_TIET_MULTIPLE = 'http://localhost:8080/gio-hang-chi-tiet/delete-multiple';
const GET_KMTT = "http://localhost:8080/khuyen_mai/hien-thiKMTT";
const CREATE_HOA_DON = "http://localhost:8080/payment/sold";
const THANH_TOAN_HOA_DON = "http://localhost:8080/payment/pay-bill";



export const GioHangService = {
    getGHOne: async (id) => {
        const response = await axios.get(`${GET_GIO_HANG_ONE}/${id}`);
        return response.data;
    },

    getDCByTaiKhoan: async (id) => {
        const response = await axios.get(`${GET_DC_BY_TAI_KHOAN}/${id}`);
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

    reloadKM:async (tongTien)=>{
        const response = await axios.get(`${GET_KMTT}/${tongTien}`);
        return response.data;
    },

    sold:async (hd) =>{
        const response = await axios.post(`${CREATE_HOA_DON}`,hd);
        return response.data;
    },

    pay:async (gia) =>{
        const response = await axios.get(`${THANH_TOAN_HOA_DON}/${gia}`);
        return response.data;
    },

    done:async () =>{
        const response = await axios.get('http://localhost:8080/api/v1/payment-callback');
       let a =  response.data;
       if (a==true){
           return true;
       }else{
           return false;
       }
    }
};