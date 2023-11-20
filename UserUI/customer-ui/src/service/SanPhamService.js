import axios from 'axios';

const GET_SAN_PHAM_ACTIVE = 'http://localhost:8080/san_pham/active';

export const SanPhamService = {
    getSPActive: async () => {
        const response = await axios.get(`${GET_SAN_PHAM_ACTIVE}`);
        return response.data;
    },

};