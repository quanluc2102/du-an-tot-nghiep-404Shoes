import axios from 'axios';
const HOADON_API_BASE_URL = "http://localhost:8080/hoa_don/hien-thi";
const HOADON_API_BASE_URL_DETAIL="http://localhost:8080/hoa_don/detail";
class HoaDonService{
    getHoaDon(){
        return axios.get(HOADON_API_BASE_URL);
    }
    getOneHD(HDID){
        return axios.get(HOADON_API_BASE_URL_DETAIL+"/"+HDID)
     }
}
export default new HoaDonService()