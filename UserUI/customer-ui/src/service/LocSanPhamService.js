import axios from 'axios';

const BASE = 'http://localhost:8080/loc';



export const LocSanPhamService = {
    getThuongHieu: async () => {
        const response = await axios.get(`${BASE}/thuonghieuloc`);
        return response.data;
    },

    getXuatXu: async () => {
        const response = await axios.get(`${BASE}/xuatxuloc`);
        return response.data;
    },

    getDanhMuc: async () => {
        const response = await axios.get(`${BASE}/danhmucloc`);
        return response.data;
    },

    getMauSac: async () => {
        const response = await axios.get(`${BASE}/mausacloc`);
        return response.data;
    },

    getKichThuoc: async () => {
        const response = await axios.get(`${BASE}/kichthuocloc`);
        return response.data;
    },

};