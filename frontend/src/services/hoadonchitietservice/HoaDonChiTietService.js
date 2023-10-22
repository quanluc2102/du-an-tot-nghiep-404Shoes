import axios from 'axios';
const HOADON_API_BASE_URL_DETAIL = "http://localhost:8080/hoa_don_chi_tiet/hien-thi";
const HOADON_API_BASE_URL = "http://localhost:8080/hoa_don_chi_tiet/hien-thi-one";
class HoaDonService{
   detailHDCT(HDID){
    return axios.get(HOADON_API_BASE_URL_DETAIL+"/"+HDID)
   }
   // getOneHDCT(HDID){
   //    return axios.get(HOADON_API_BASE_URL+"/"+HDID)
   // }
}
export default new HoaDonService()