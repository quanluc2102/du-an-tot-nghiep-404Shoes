import axios from 'axios';
const API_BASE_URL = "http://localhost:8080/tai_khoan/index";
const API_SAVE_URL = "http://localhost:8080/tai_khoan/add";
const API_DELETE_URL = "http://localhost:8080/tai_khoan/delete";
const API_UPDATE_URL = "http://localhost:8080/tai_khoan/update";

class taikhoanservice {



    getTaiKhoan() {
        return axios.get(API_BASE_URL);
    }

    addTaiKhoan(taiKhoan) {
        return axios.post(API_SAVE_URL, taiKhoan)
    }

    deleteTaiKhoan(id) {
        return axios.delete(API_DELETE_URL + '/' + id)
    }

    getTaiKhoanById(id) {
        return axios.get(API_BASE_URL + "/" + id);
    }

    updateTaiKhoan(id,taiKhoan) {
        console.log(id)
        return axios.put(API_UPDATE_URL + "/" + id,taiKhoan)
    }

}

export default new taikhoanservice();