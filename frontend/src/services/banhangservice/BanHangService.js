import axios from 'axios';
const SPCT_API_BASE_URL = "http://localhost:8080/san_pham_chi_tiet/hien-thi";
const KHACH_HANG_BASE_URL = "http://localhost:8080/ban_hang/hienthiKH";
const CREATE_HOA_DON_URL = "http://localhost:8080/hoa_don/add";
const API_GETKMTT = "http://localhost:8080/khuyen_mai/hien-thiKMTT";
const API_GETDChi = "http://localhost:8080/dia_chi/TTDC";
const API_GETKM = "http://localhost:8080/khuyen_mai/hien-thiKM";
class BanHangService{
    getSPCT(){
        return axios.get(SPCT_API_BASE_URL);
    }
    getKM(id){
        return axios.get(API_GETKM+"/"+id);
     }
     getDC(id){
        return axios.get(API_GETDChi+"/"+id);
     }
    getKMTT(tongTien){
        return axios.get(API_GETKMTT+"/"+tongTien)
     }
    getKhachHang(){
        return axios.get(KHACH_HANG_BASE_URL);
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