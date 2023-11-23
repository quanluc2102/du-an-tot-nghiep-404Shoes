import axios from 'axios';
const SPCT_API_BASE_URL = "http://localhost:8080/san_pham_chi_tiet/hien-thi";

class BanHangService{
    getSPCT(){
        return axios.get(SPCT_API_BASE_URL);
    }
}
export default new BanHangService()