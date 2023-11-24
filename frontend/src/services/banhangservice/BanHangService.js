import axios from 'axios';
const SPCT_API_BASE_URL = "http://localhost:8080/san_pham_chi_tiet/hien-thi";
const CREATE_API_HOA_DON_URL = "http://localhost:8080/hoa_don/create";
const KHACH_HANG_BASE_URL = "http://localhost:8080/tai_khoan/index";

class BanHangService{
    getSPCT(){
        return axios.get(SPCT_API_BASE_URL);
    }

    createHoaDon(){
        return axios.post(CREATE_API_HOA_DON_URL);
    }

    getKhachHang(){
        return axios.get(KHACH_HANG_BASE_URL);
    }


}
export default new BanHangService()