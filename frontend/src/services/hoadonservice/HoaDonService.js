import axios from 'axios';
const HOADON_API_BASE_URL = "http://localhost:8080/hoa_don/hien-thi";
const HOADON_API_BASE_URL_DETAIL="http://localhost:8080/hoa_don/detail";
const HOADON_API_BASE_URL_TK = "http://localhost:8080/hoa_don/hien-thi-taiKhoanKH";
const HOADON_API_BASE_URL_UPDATE="http://localhost:8080/hoa_don/update";
const HOADON_API_BASE_URL_HUYHD="http://localhost:8080/hoa_don/huyHD";
const HOADON_API_BASE_URL_UPDATEDC="http://localhost:8080/hoa_don/updateDC";
const HOADON_API_BASE_URL_INHD="http://localhost:8080/hoa_don/export";

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
    updateHoaDonDC( hoaDonId,hoaDon) {
        console.log(hoaDonId)
        return axios.put(HOADON_API_BASE_URL_UPDATEDC + "/" + hoaDonId, hoaDon)
    }
    inHD( hoaDonId) {
        console.log(hoaDonId)
        return axios.get(HOADON_API_BASE_URL_INHD + "/" + hoaDonId)
    }
    huyHD(hoaDon,Id) {
        console.log(Id)
        return axios.put(HOADON_API_BASE_URL_HUYHD + "/" + Id,hoaDon)
    }
}
export default new HoaDonService()