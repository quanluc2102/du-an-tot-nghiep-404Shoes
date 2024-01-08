// src/services/HoaDonService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/khach_hang_page'; // Thay thế bằng URL thật của backend API
const savedUser = JSON.parse(localStorage.getItem('currentUser'));


const accountservice = {

    all: () => {
        return axios.get(`${API_URL}/all?id=${savedUser.id}`)
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching data:', error);
                throw error;
            });
    },

    getHoaDonChuaXacNhan: () => {
        return axios.get(`${API_URL}/hoa_don_chua_xac_nhan?id=${savedUser.id}`)
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching data:', error);
                throw error;
            });
    },

    hoa_don_xac_nhan: () => {
        return axios.get(`${API_URL}/hoa_don_xac_nhan?id=${savedUser.id}`)
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching data:', error);
                throw error;
            });
    },

    hoa_don_dong_goi: () => {
        return axios.get(`${API_URL}/hoa_don_dong_goi?id=${savedUser.id}`)
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching data:', error);
                throw error;
            });
    },

    hoa_don_dang_giao: () => {
        return axios.get(`${API_URL}/hoa_don_dang_giao?id=${savedUser.id}`)
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching data:', error);
                throw error;
            });
    },

    hoa_don_hoan_thanh: () => {
        return axios.get(`${API_URL}/hoa_don_hoan_thanh?id=${savedUser.id}`)
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching data:', error);
                throw error;
            });
    },

    huy: () => {
        return axios.get(`${API_URL}/huy?id=${savedUser.id}`)
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching data:', error);
                throw error;
            });
    },

    mua_tai_quay: () => {
        return axios.get(`${API_URL}/mua_tai_quay?id=${savedUser.id}`)
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching data:', error);
                throw error;
            });
    },
};

export default accountservice;
