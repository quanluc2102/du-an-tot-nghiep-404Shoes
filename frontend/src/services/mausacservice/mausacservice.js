import axios from 'axios';
const API_BASE_URL = "http://localhost:8080/mau_sac/hien_thi";
const API_SAVE_URL = "http://localhost:8080/mau_sac/add";
const API_DELETE_URL = "http://localhost:8080/mau_sac/delete";
const API_UPDATE_URL = "http://localhost:8080/mau_sac/update";

class mausacservice {


    
    getMauSac() {
        return axios.get(API_BASE_URL);
    }

    createMauSac(mauSac) {
        return axios.post(API_SAVE_URL, mauSac)
    }

    deleteMauSac(mauSacId) {
        return axios.delete(API_DELETE_URL + '/' + mauSacId)
    }

    getMauSacById(mauSacId) {
        return axios.get(API_BASE_URL + "/" + mauSacId);
    }

    updateMauSac(mauSac, mauSacId) {
        console.log(mauSacId)
        return axios.put(API_UPDATE_URL + "/" + mauSacId, mauSac)
    }

}

export default new mausacservice();