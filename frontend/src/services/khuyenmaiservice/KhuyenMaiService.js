import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/khuyen_mai/index";
const API_BASE_URL_NO_PAGE = "http://localhost:8080/khuyen_mai/indexAll";
const BASE_URL_DETAIL = "http://localhost:8080/khuyen_mai/detail";
// const BASE_URL_ADD = "http://localhost:8080/khuyen_mai/add";
const API_DELETE_URL = "http://localhost:8080/khuyen_mai/delete";
const API_UPDATE_URL = "http://localhost:8080/khuyen_mai/update";
const API_SAVE_URL = "http://localhost:8080/khuyen_mai/add";
const DANHMUC_API_UPDATEtt_URL = "http://localhost:8080/khuyen_mai/updatett";


class KhuyenMaiService {

    getKhuyenMai(pageNumber) {
        return axios.get(API_BASE_URL + +`?page=${pageNumber}&size=5`);
    }

    getKhuyenMaiAll() {
        // Thực hiện cuộc gọi đến API endpoint mới trả về toàn bộ dữ liệu khuyenMai
        return axios.get(API_BASE_URL_NO_PAGE);
    }


    createKhuyenMai(khuyenMai) {
        return axios.post(API_SAVE_URL, khuyenMai)
    }

    getKhuyenMaiById(id) {
        return axios.get(BASE_URL_DETAIL + "/" + id);
    }

    // addKhuyenMai(khuyenMai){
    //     return axios.post(BASE_URL_ADD,khuyenMai);
    // }

    deleteKhuyenMai(id) {
        return axios.delete(API_DELETE_URL + "/" + id);
    }

    updateKhuyenMai(id, khuyenMai) {
        console.log(id);
        return axios.put(API_UPDATE_URL + "/" + id, khuyenMai);
    }

    // updateKhuyenMai(khuyenMaiUpdate, id) {
    //     return axios.put(`http://localhost:8080/khuyen_mai/update/${id}`, khuyenMaiUpdate);
    // }
    updateDanhMucTrangThai(trangThai, khuyenMaiId) {
        return axios.put(DANHMUC_API_UPDATEtt_URL + "/" + khuyenMaiId, trangThai); // Truyền trạng thái thay vì danhMuc
    }

}

export default new KhuyenMaiService();