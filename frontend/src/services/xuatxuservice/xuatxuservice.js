import axios from 'axios';
const API_BASE_URL = "http://localhost:8080/xuat_xu/hien_thi";
const API_SAVE_URL = "http://localhost:8080/xuat_xu/add";
const API_DELETE_URL = "http://localhost:8080/xuat_xu/delete";
const API_UPDATE_URL = "http://localhost:8080/xuat_xu/update";

class xuatxuservice {


    
    getXuatXu(pageNumber) {
        return axios.get(API_BASE_URL+`?page=${pageNumber}&size=5`);
    }

    createXuatXu(xuatXu) {
        return axios.post(API_SAVE_URL, xuatXu)
    }

    deleteXuatXu(xuatXuId) {
        return axios.delete(API_DELETE_URL + '/' + xuatXuId)
    }

    getXuatXuById(xuatXuId) {
        return axios.get(API_BASE_URL + "/" + xuatXuId);
    }

    updateXuatXu(xuatXu, xuatXuId) {
        console.log(xuatXuId)
        return axios.put(API_UPDATE_URL + "/" + xuatXuId, xuatXu)
    }

}

export default new xuatxuservice();