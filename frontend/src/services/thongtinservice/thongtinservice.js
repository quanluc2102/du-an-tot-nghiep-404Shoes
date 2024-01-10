import axios from 'axios';
const API_BASE_URL = "http://localhost:8080/thong_tin/index";
const API_SAVE_URL = "http://localhost:8080/thong_tin/add";
const API_DELETE_URL = "http://localhost:8080/thong_tin/delete";
const API_UPDATE_URL = "http://localhost:8080/thong_tin/update";
 const API_API_BASE_URL_SAVE_DIA_CHI = "http://localhost:8080/dia_chi/addOrUpdateDC";
// const API_API_BASE_URL_SAVE_THONG_TIN = "http://localhost:8080/thong_tin/addOrUpdateDC";
class thongtinservice {



    getThongTin(pageNumber) {
        return axios.get(API_BASE_URL+`?page=${pageNumber}&size=5`);
    }

    addThongTin(thongTin) {
        return axios.post(API_SAVE_URL, thongTin)
    }
    addDC(diaChi) {
        return axios.post(API_API_BASE_URL_SAVE_DIA_CHI, diaChi)
    }
    // addTT(thongTin) {
    //     return axios.post(API_API_BASE_URL_SAVE_THONG_TIN, thongTin)
    // }
    deleteThongTin(id) {
        return axios.delete(API_DELETE_URL + '/' + id)
    }

    getThongTinById(id) {
        return axios.get(API_BASE_URL + "/" + id);
    }

    updateThongTin(thongTin, id) {
        console.log(id)
        return axios.put(API_UPDATE_URL + "/" + id, thongTin)
    }
}

export default new thongtinservice();