import axios from 'axios';

const GET_SAN_PHAM_ACTIVE = 'http://localhost:8080/san_pham/active';
const GET_SAN_PHAM_PHAN_TRANG = 'http://localhost:8080/san_pham/index';
const GET_SAN_PHAM_ANH = 'http://localhost:8080/san_pham/detail_spa';
const GET_SAN_PHAM_CHI_TIET = 'http://localhost:8080/san_pham/detail_spct';
const GET_SAN_PHAM_ONE = 'http://localhost:8080/san_pham/detail_user';
const GET_GIO_HANG_FAKE = 'http://localhost:8080/gio-hang-chi-tiet/get-gio-hang';
const ADD_SPCT_TO_GIO_HANG = 'http://localhost:8080/payment/add_gio_hang';


export const SanPhamService = {
    getSPActive: async () => {
        const response = await axios.get(`${GET_SAN_PHAM_ACTIVE}`);
        return response.data;
    },

    getSPPhanTrang: async (page) => {
        const response = await axios.get(`${GET_SAN_PHAM_PHAN_TRANG}?page=${page}`);
        return response.data;
    },

    getSPAnh: async (id) => {
        const response = await axios.get(`${GET_SAN_PHAM_ANH}/${id}`);
        return response.data;
    },

    getSPCT: async (id) => {
        const response = await axios.get(`${GET_SAN_PHAM_CHI_TIET}/${id}`);
        return response.data;
    },

    getSPOne: async (id) => {
        const response = await axios.get(`${GET_SAN_PHAM_ONE}/${id}`);
        return response.data;
    },

    addGioHang: async (request) =>{
        try {
            const response = await axios.post(`${ADD_SPCT_TO_GIO_HANG}`, request);
            return response.data; // Nếu server trả về dữ liệu sau khi thêm vào giỏ hàng
        } catch (error) {
            console.error('Error adding to cart:', error);
            throw error; // Nếu có lỗi, bạn có thể xử lý hoặc truyền lỗi ra ngoài
        }
    },

    fakeGHGuest: async () => {
        const response = await axios.get(`${GET_GIO_HANG_FAKE}`);
        return response.data;
    },

};