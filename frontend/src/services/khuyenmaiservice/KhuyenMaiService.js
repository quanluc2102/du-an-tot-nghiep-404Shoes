import axios from 'axios';

const BASE_URL_INDEX = "http://localhost:8080/khuyen_mai/index";
const BASE_URL_DETAIL = "http://localhost:8080/khuyen_mai/detail";
const BASE_URL_ADD = "http://localhost:8080/khuyen_mai/add";
const BASE_URL_DELETE = "http://localhost:8080/khuyen_mai/delete";
const BASE_URL_UPDATE = "http://localhost:8080/khuyen_mai/update";

class KhuyenMaiService {

    getKhuyenMai(){
        return axios.get(BASE_URL_INDEX);
    }

    getKhuyenMaiById(id){
        return axios.get(BASE_URL_DETAIL+"/"+id);
    }

    addKhuyenMai(khuyenMai){
        return axios.post(BASE_URL_ADD,khuyenMai);
    }

    deleteKhuyenMai(id){
        return axios.delete(BASE_URL_DELETE+"/"+id);
    }

    updateKhuyenMai(id,khuyenMai){
        console.log(id);
        return axios.put(BASE_URL_UPDATE+"/"+id,khuyenMai);
    }
}
export  default new KhuyenMaiService();