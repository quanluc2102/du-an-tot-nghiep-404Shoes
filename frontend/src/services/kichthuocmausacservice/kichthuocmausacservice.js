import axios from 'axios';
const KICHTHUOC_API_BASE_URL = "http://localhost:8080/kich_thuoc/hien_thi";
const MAUSAC_API = 'http://localhost:8080/mau_sac/hien_thi';
const API_BASE_URL = "http://localhost:8080/kich_thuoc_mau_sac/hien_thi";
const API_SAVE_URL = "http://localhost:8080/kich_thuoc_mau_sac/add";
const API_DELETE_URL = "http://localhost:8080/kich_thuoc_mau_sac/delete";
const API_UPDATE_URL = "http://localhost:8080/kich_thuoc_mau_sac/update";

class kichthuocmausacservice {


    getKichThuoc() {
        return axios.get(KICHTHUOC_API_BASE_URL);
    }
    getMauSac() {
        return axios.get(MAUSAC_API);
    }
    getKichThuocMauSac() {
        return axios.get(API_BASE_URL);
    }

    createKichThuocMauSac(kichThuocMauSac) {
        return axios.post(API_SAVE_URL, kichThuocMauSac)
    }

    deleteKichThuocMauSac(kichThuocMauSacId) {
        return axios.delete(API_DELETE_URL + '/' + kichThuocMauSacId)
    }

    getKichThuocMauSacById(kichThuocMauSacId) {
        return axios.get(API_BASE_URL + "/" + kichThuocMauSacId);
    }

    updateKichThuocMauSac(kichThuocMauSac, kichThuocMauSacId) {
        console.log(kichThuocMauSacId)
        return axios.put(API_UPDATE_URL + "/" + kichThuocMauSacId, kichThuocMauSac)
    }

}

export default new kichthuocmausacservice();