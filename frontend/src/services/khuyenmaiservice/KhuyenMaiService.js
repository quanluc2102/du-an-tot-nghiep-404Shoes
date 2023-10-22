import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/khuyen_mai/index";
const BASE_URL_DETAIL = "http://localhost:8080/khuyen_mai/detail";
const BASE_URL_ADD = "http://localhost:8080/khuyen_mai/add";
const API_DELETE_URL = "http://localhost:8080/khuyen_mai/delete";
const API_UPDATE_URL = "http://localhost:8080/khuyen_mai/update";

class KhuyenMaiService {

    getKhuyenMai(pageNumber){
        return axios.get(API_BASE_URL+`?page=${pageNumber}&size=5`);
    }


    getKhuyenMaiById(id){
        return axios.get(BASE_URL_DETAIL+"/"+id);
    }

    addKhuyenMai(khuyenMai){
        return axios.post(BASE_URL_ADD,khuyenMai);
    }

    deleteKhuyenMai(id){
        return axios.delete(API_DELETE_URL+"/"+id);
    }

    updateKhuyenMai(id,khuyenMai){
        console.log(id);
        return axios.put(API_UPDATE_URL+"/"+id,khuyenMai);
    }
}
export  default new KhuyenMaiService();