import axios from 'axios';
const SPCT_API_BASE_URL = "http://localhost:8080/san_pham_chi_tiet/hien-thi";
const KHACH_HANG_BASE_URL = "http://localhost:8080/tai_khoan/index";
const CREATE_HOA_DON_URL = "http://localhost:8080/hoa_don/add";

class BanHangService{
    getSPCT(){
        return axios.get(SPCT_API_BASE_URL);
    }

    getKhachHang(){
        return axios.get(KHACH_HANG_BASE_URL);
    }

    async createHoaDon(thanhToan) {
        console.log(thanhToan);
        try {
            const response = await axios.post(CREATE_HOA_DON_URL, thanhToan);
            console.log(response.data);
            return response.data;
        } catch (error) {
            if (error.response) {
                console.error('Server Error:', error.response.data);
            } else if (error.request) {
                console.error('Request Error:', error.request);
            } else {
                console.error('Error:', error.message);
            }
            throw error;
        }
    }

}
export default new BanHangService()