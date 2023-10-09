
import axios from 'axios';

const DANHMUC_API_BASE_URL = "http://localhost:8080/danh_muc/hien_thi";

// const NSX_API_SAVE_URL = "http://localhost:8080/api/nsx/add";
// const NSX_API_UPDATE_URL = "http://localhost:8080/api/nsx/update";

class danhmucservice {
    getDanhMuc() {
        return axios.get(DANHMUC_API_BASE_URL);
    }

    // createNSX(nsx) {
    //     return axios.post(NSX_API_SAVE_URL, nsx)
    // }

    // getNSXById(NSXId) {
    //     return axios.get(NSX_API_BASE_URL + "/" + NSXId);
    // }

    // updateNSX(nsx, nsxId) {
    //     return axios.put(NSX_API_UPDATE_URL + "/" + nsxId, nsx)
    // }

}

export default new danhmucservice();