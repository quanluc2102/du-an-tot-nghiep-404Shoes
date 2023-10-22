import axios from 'axios';
const API_BASE_URL = "http://localhost:8080/tai_khoan/index";
const API_API_BASE_URL_SAVE = "http://localhost:8080/tai_khoan/add";
const API_BASE_URL_DELETE = "http://localhost:8080/tai_khoan/delete";
const API_BASE_URL_UPDATE = "http://localhost:8080/tai_khoan/update";

class taikhoanservice {



    getTaiKhoan(pageNumber) {
        return axios.get(API_BASE_URL+`?page=${pageNumber}&size=5`);
    }

    addTaiKhoan(taiKhoan) {
        return axios.post(API_API_BASE_URL_SAVE, taiKhoan)
    }

    deleteTaiKhoan(id) {
        return axios.delete(API_BASE_URL_DELETE + '/' + id)
    }

    getTaiKhoanById(id) {
        return axios.get(API_BASE_URL + "/" + id);
    }

    updateTaiKhoan(taiKhoan,id) {
        console.log(id)
        return axios.put(API_BASE_URL_UPDATE + "/" + id,taiKhoan)
    }

}

export default new taikhoanservice();