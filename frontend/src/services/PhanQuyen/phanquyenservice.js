import axios from 'axios';
const API_BASE_URL_PHAN_QUYEN_INDEX = "http://localhost:8080/phan_quyen/index";
const API_BASE_URL_TAI_KHOAN_INDEX = "http://localhost:8080/tai_khoan/index";
const API_BASE_URL_QUYEN_INDEX = "http://localhost:8080/quyen/hien_thi";

class phanquyenservice {

    getPhanQuyen(pageNumber) {
        return axios.get(API_BASE_URL_PHAN_QUYEN_INDEX+`?page=${pageNumber}&size=5`);
    }
    getTaiKhoan(){
        return axios.get(API_BASE_URL_TAI_KHOAN_INDEX);
    }
    getQuyen(){
        return axios.get(API_BASE_URL_QUYEN_INDEX);
    }
}

export default new phanquyenservice();