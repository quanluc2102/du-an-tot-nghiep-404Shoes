import axios from 'axios';
const HOADON_API_BASE_URL = "http://localhost:8080/hoa_don/hien-thi";
class HoaDonService{
    getHoaDon(){
        return axios.get(HOADON_API_BASE_URL);
    }
}
export default new HoaDonService()