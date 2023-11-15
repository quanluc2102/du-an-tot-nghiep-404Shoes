import axios from 'axios';
const HOADON_API_BASE_URL = "http://localhost:8080/hoa_don/hien-thi";
const HOADON_API_BASE_URL_DETAIL="http://localhost:8080/hoa_don/detail";
const HOADON_API_BASE_URL_TK = "http://localhost:8080/hoa_don/hien-thi-taiKhoanKH";
const HOADON_API_BASE_URL_UPDATE="http://localhost:8080/hoa_don/update";

class HoaDonService{
    getHoaDon(){
        return axios.get(HOADON_API_BASE_URL);
    }
    getOneHD(HDID){
        return axios.get(HOADON_API_BASE_URL_DETAIL+"/"+HDID)
     }
     getPhanQUyen(){
        return axios.get(HOADON_API_BASE_URL_TK+"/"+3);
    }
    updateHoaDon(hoaDon, hoaDonId) {
        console.log(hoaDonId)
        return axios.put(HOADON_API_BASE_URL_UPDATE + "/" + hoaDonId, hoaDon)
    }
}
export default new HoaDonService()