import axios from 'axios';
const SPCT_API_BASE_URL = "http://localhost:8080/san_pham_chi_tiet/hien-thi";
const KHACH_HANG_BASE_URL = "http://localhost:8080/ban_hang/hienthiKH";
const CREATE_HOA_DON_URL = "http://localhost:8080/hoa_don/add";
const API_GETKMTT = "http://localhost:8080/khuyen_mai/hien-thiKMTT";
class BanHangService{
    getSPCT(){
        return axios.get(SPCT_API_BASE_URL);
    }

    getKhachHang(){
        return axios.get(KHACH_HANG_BASE_URL);
    }
    getKMTT() {
        // Thực hiện cuộc gọi đến API endpoint mới trả về toàn bộ dữ liệu khuyenMai
        return axios.get(API_GETKMTT);
    }

    async createHoaDon(thanhToan) {
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