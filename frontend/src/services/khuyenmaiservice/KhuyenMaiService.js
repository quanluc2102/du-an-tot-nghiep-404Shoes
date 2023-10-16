import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/khuyen_mai/hien_thi";
const API_SAVE_URL = "http://localhost:8080/khuyen_mai/add";
const API_DELETE_URL = "http://localhost:8080/khuyen_mai/delete";
const API_UPDATE_URL = "http://localhost:8080/khuyen_mai/update";

class KhuyenMaiService {

    getKhuyenMai(){
        return axios.get(API_BASE_URL);
    }
    createKhuyenMai(khuyenMai){
        return axios.post(API_SAVE_URL,khuyenMai);
    }
    deleteKhuyenMai(khuyenMaiId){
        return axios.get(API_DELETE_URL + "/" + khuyenMaiId);
    }
    getKhuyenMaiById(khuyenMaiId){
        return axios.get(API_BASE_URL + "/" + khuyenMaiId);

    }
    updateKhuyenMai(khuyenMai,khuyenMaiId){
        console.log(khuyenMaiId)
        return axios.put(API_UPDATE_URL + "/" + khuyenMaiId,khuyenMai)
    }
}
export  default new KhuyenMaiService();