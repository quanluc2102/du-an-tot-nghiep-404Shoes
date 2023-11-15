import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/thong_ke/thong_ke_theo_doanh_thu_san_pham";

class ThongKeService {
    getThongKeSanPham(startDate, endDate) {
        return axios.get(API_BASE_URL, {params: {startDate, endDate}})
            .then(response => {
                // Xử lý dữ liệu khi request thành công
                return response.data;
            })
            .catch(error => {
                // Xử lý lỗi khi request thất bại
                console.error("Error in getThongKeSanPham:", error);
                throw error; // Re-throw lỗi để component gọi service có thể xử lý tiếp
            });
    }
}

export default new ThongKeService();
