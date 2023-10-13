import axios from 'axios';
const DANHMUC_API_BASE_URL = "http://localhost:8080/danh_muc/hien_thi";
const SANPHAM_API = 'http://localhost:8080/san_pham/index';
const API_BASE_URL = "http://localhost:8080/san_pham_danh_muc/hien_thi";
const API_SAVE_URL = "http://localhost:8080/san_pham_danh_muc/add";
const API_DELETE_URL = "http://localhost:8080/san_pham_danh_muc/delete";
const API_UPDATE_URL = "http://localhost:8080/san_pham_danh_muc/update";

class sanphamdanhmucservice {


    getDanhMuc() {
        return axios.get(DANHMUC_API_BASE_URL);
    }
    getSanPham() {
        return axios.get(SANPHAM_API);
    }
    getSanPhamDanhMuc() {
        return axios.get(API_BASE_URL);
    }

    createSanPhamDanhMuc(sanPhamDanhMuc) {
        return axios.post(API_SAVE_URL, sanPhamDanhMuc)
    }

    deleteSanPhamDanhMuc(sanPhamDanhMucId) {
        return axios.delete(API_DELETE_URL + '/' + sanPhamDanhMucId)
    }

    getSanPhamDanhMucById(sanPhamDanhMucId) {
        return axios.get(API_BASE_URL + "/" + sanPhamDanhMucId);
    }

    updateSanPhamDanhMuc(sanPhamDanhMuc, sanPhamDanhMucId) {
        console.log(sanPhamDanhMucId)
        return axios.put(API_UPDATE_URL + "/" + sanPhamDanhMucId, sanPhamDanhMuc)
    }

}

export default new sanphamdanhmucservice();