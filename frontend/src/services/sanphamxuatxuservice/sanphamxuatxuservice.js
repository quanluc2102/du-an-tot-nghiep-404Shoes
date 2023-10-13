import axios from 'axios';
const XUATXU_API_BASE_URL = "http://localhost:8080/xuat_xu/hien_thi";
const SANPHAM_API = 'http://localhost:8080/san_pham/index';
const API_BASE_URL = "http://localhost:8080/san_pham_xuat_xu/hien_thi";
const API_SAVE_URL = "http://localhost:8080/san_pham_xuat_xu/add";
const API_DELETE_URL = "http://localhost:8080/san_pham_xuat_xu/delete";
const API_UPDATE_URL = "http://localhost:8080/san_pham_xuat_xu/update";

class sanphamxuatxuservice {


    getXuatXu() {
        return axios.get(XUATXU_API_BASE_URL);
    }
    getSanPham() {
        return axios.get(SANPHAM_API);
    }
    getSanPhamXuatXu() {
        return axios.get(API_BASE_URL);
    }

    createSanPhamXuatXu(sanPhamXuatXu) {
        return axios.post(API_SAVE_URL, sanPhamXuatXu)
    }

    deleteSanPhamXuatXu(sanPhamXuatXuId) {
        return axios.delete(API_DELETE_URL + '/' + sanPhamXuatXuId)
    }

    getSanPhamXuatXuById(sanPhamXuatXuId) {
        return axios.get(API_BASE_URL + "/" + sanPhamXuatXuId);
    }

    updateSanPhamXuatXu(sanPhamXuatXu, sanPhamXuatXuId) {
        console.log(sanPhamXuatXuId)
        return axios.put(API_UPDATE_URL + "/" + sanPhamXuatXuId, sanPhamXuatXu)
    }

}

export default new sanphamxuatxuservice();