import axios from 'axios';
const THUONGHIEU_API_BASE_URL = "http://localhost:8080/thuong_hieu/hien_thi";
const SANPHAM_API = 'http://localhost:8080/san_pham/index';
const API_BASE_URL = "http://localhost:8080/san_pham_thuong_hieu/hien_thi";
const API_SAVE_URL = "http://localhost:8080/san_pham_thuong_hieu/add";
const API_DELETE_URL = "http://localhost:8080/san_pham_thuong_hieu/delete";
const API_UPDATE_URL = "http://localhost:8080/san_pham_thuong_hieu/update";

class sanphamthuonghieuservice {


    getThuongHieu() {
        return axios.get(THUONGHIEU_API_BASE_URL);
    }
    getSanPham() {
        return axios.get(SANPHAM_API);
    }
    getSanPhamThuongHieu() {
        return axios.get(API_BASE_URL);
    }

    createSanPhamThuongHieu(sanPhamThuongHieu) {
        return axios.post(API_SAVE_URL, sanPhamThuongHieu)
    }

    deleteSanPhamThuongHieu(sanPhamThuongHieuId) {
        return axios.delete(API_DELETE_URL + '/' + sanPhamThuongHieuId)
    }

    getSanPhamThuongHieuById(sanPhamThuongHieuId) {
        return axios.get(API_BASE_URL + "/" + sanPhamThuongHieuId);
    }

    updateSanPhamThuongHieu(sanPhamThuongHieu, sanPhamThuongHieuId) {
        console.log(sanPhamThuongHieuId)
        return axios.put(API_UPDATE_URL + "/" + sanPhamThuongHieuId, sanPhamThuongHieu)
    }

}

export default new sanphamthuonghieuservice();