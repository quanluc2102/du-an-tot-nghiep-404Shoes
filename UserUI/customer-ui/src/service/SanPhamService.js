import axios from 'axios';

const GET_SAN_PHAM_ACTIVE = 'http://localhost:8080/san_pham/active';
const GET_SAN_PHAM_PHAN_TRANG = 'http://localhost:8080/san_pham/index';

export const SanPhamService = {
    getSPActive: async () => {
        const response = await axios.get(`${GET_SAN_PHAM_ACTIVE}`);
        return response.data;
    },

    getSPPhanTrang: async (page) => {
        const response = await axios.get(`${GET_SAN_PHAM_PHAN_TRANG}/page=${page}`);
        return response.data;
    },
};