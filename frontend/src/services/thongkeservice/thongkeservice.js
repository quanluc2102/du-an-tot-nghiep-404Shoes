import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/thong_ke";

class ThongKeService {
    getThongKeSanPham(startDate, endDate) {
        const url = `${API_BASE_URL}/thong_ke_theo_doanh_thu_san_pham`;
        return axios.get(url, {params: {startDate, endDate}})
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

    getDoanhThuThangCustom(date) {
        const url = `${API_BASE_URL}/doanh_thu_thang_custom`;
        const startDate =  date+'-01'
        const endDate =  date+'-01'
        console.log(startDate)
        console.log(endDate)
        return axios.get(url, {params: {startDate}})
            .then(response => response.data)
            .catch(error => {
                console.error("Error in getDoanhThuThangCustom:", error);
                throw error;
            });
    }

    getDoanhThuNamCustom(date) {
        const url = `${API_BASE_URL}/doanh_thu_nam_custom`;
        const startDate =  date+'-01-01'
        return axios.get(url, {params: {startDate}})
            .then(response => response.data)
            .catch(error => {
                console.error("Error in getDoanhThuThangCustom:", error);
                throw error;
            });
    }

    getDoanhThuThangNew(date) {
        const url = `${API_BASE_URL}/doanh_thu_theo_thang_new`;
        const startDate =  date+'-01-01'
        return axios.get(url, {params: {startDate}})
            .then(response => response.data)
            .catch(error => {
                console.error("Error in getDoanhThuThangCustom:", error);
                throw error;
            });
    }

    getDoanhThuNgay() {
        const url = `${API_BASE_URL}/doanh_thu_ngay`;
        return axios.get(url)
            .then(response => response.data)
            .catch(error => {
                console.error("Error in getDoanhThuNgay:", error);
                throw error;
            });
    }

    getDoanhThuTuan() {
        // Lấy ngày hiện tại
        const currentDate = new Date();
        // Lấy ngày đầu tiên của tuần hiện tại (thứ 2)
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + (currentDate.getDay() === 0 ? -6 : 1));

        // Lấy ngày cuối cùng của tuần hiện tại (Chủ nhật)
        const endOfWeek = new Date(currentDate);
        endOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 7);

        const url = `${API_BASE_URL}/doanh_thu_tuan`;
        return axios.get(url, {params: {startDate: startOfWeek, endDate: endOfWeek}})
            .then(response => response.data)
            .catch(error => {
                console.error("Error in getDoanhThuTuan:", error);
                throw error;
            });
    }


    getDoanhThuThang() {
        const url = `${API_BASE_URL}/doanh_thu_thang`;
        return axios.get(url)
            .then(response => response.data)
            .catch(error => {
                console.error("Error in getDoanhThuThang:", error);
                throw error;
            });
    }

    getDoanhThuQuy() {
        const url = `${API_BASE_URL}/doanh_thu_quy`;
        return axios.get(url)
            .then(response => response.data)
            .catch(error => {
                console.error("Error in getDoanhThuQuy:", error);
                throw error;
            });
    }

    getDoanhThuNam() {
        const url = `${API_BASE_URL}/doanh_thu_nam`;
        return axios.get(url)
            .then(response => response.data)
            .catch(error => {
                console.error("Error in getDoanhThuNam:", error);
                throw error;
            });
    }

    getHoaDonNgay() {
        const url = `${API_BASE_URL}/hoa_don_ngay`;
        return axios.get(url)
            .then(response => response.data)
            .catch(error => {
                console.error("Error in getHoaDonNgay:", error);
                throw error;
            });
    }

    getHoaDonTuan() {
        // Lấy ngày hiện tại
        const currentDate = new Date();
        // Lấy ngày đầu tiên của tuần hiện tại (thứ 2)
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + (currentDate.getDay() === 0 ? -6 : 1));

        // Lấy ngày cuối cùng của tuần hiện tại (Chủ nhật)
        const endOfWeek = new Date(currentDate);
        endOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 7);

        const url = `${API_BASE_URL}/hoa_don_tuan`;
        return axios.get(url, {params: {startDate: startOfWeek, endDate: endOfWeek}})
            .then(response => response.data)
            .catch(error => {
                console.error("Error in getHoaDonTuan:", error);
                throw error;
            });
    }


    getHoaDonThang() {
        const url = `${API_BASE_URL}/hoa_don_thang`;
        return axios.get(url)
            .then(response => response.data)
            .catch(error => {
                console.error("Error in getHoaDonThang:", error);
                throw error;
            });
    }

    getHoaDonQuy() {
        const url = `${API_BASE_URL}/hoa_don_quy`;
        return axios.get(url)
            .then(response => response.data)
            .catch(error => {
                console.error("Error in getHoaDonQuy:", error);
                throw error;
            });
    }

    getHoaDonNam() {
        const url = `${API_BASE_URL}/hoa_don_nam`;
        return axios.get(url)
            .then(response => response.data)
            .catch(error => {
                console.error("Error in getHoaDonNam:", error);
                throw error;
            });
    }


    getHoaDonHuyNgay() {
        const url = `${API_BASE_URL}/hoa_don_huy_ngay`;
        return axios.get(url)
            .then(response => response.data)
            .catch(error => {
                console.error("Error in getHoaDonNgay:", error);
                throw error;
            });
    }

    getHoaDonHuyTuan() {
        // Lấy ngày hiện tại
        const currentDate = new Date();
        // Lấy ngày đầu tiên của tuần hiện tại (thứ 2)
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + (currentDate.getDay() === 0 ? -6 : 1));

        // Lấy ngày cuối cùng của tuần hiện tại (Chủ nhật)
        const endOfWeek = new Date(currentDate);
        endOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 7);

        const url = `${API_BASE_URL}/hoa_don_huy_tuan`;
        return axios.get(url, {params: {startDate: startOfWeek, endDate: endOfWeek}})
            .then(response => response.data)
            .catch(error => {
                console.error("Error in getHoaDonTuan:", error);
                throw error;
            });
    }


    getHoaDonHuyThang() {
        const url = `${API_BASE_URL}/hoa_don_huy_thang`;
        return axios.get(url)
            .then(response => response.data)
            .catch(error => {
                console.error("Error in getHoaDonThang:", error);
                throw error;
            });
    }

    getHoaDonHuyQuy() {
        const url = `${API_BASE_URL}/hoa_don_huy_quy`;
        return axios.get(url)
            .then(response => response.data)
            .catch(error => {
                console.error("Error in getHoaDonQuy:", error);
                throw error;
            });
    }

    getHoaDonHuyNam() {
        const url = `${API_BASE_URL}/hoa_don_huy_nam`;
        return axios.get(url)
            .then(response => response.data)
            .catch(error => {
                console.error("Error in getHoaDonNam:", error);
                throw error;
            });
    }

    countSanPhamChiTietTQ() {
        const url = `${API_BASE_URL}/tong_so_san_pham`;
        return axios.get(url)
            .then(response => response.data)
            .catch(error => {
                console.error("Error in getHoaDonNam:", error);
                throw error;
            });
    }

    countHoaDonTQ() {
        const url = `${API_BASE_URL}/tong_so_hoa_don`;
        return axios.get(url)
            .then(response => response.data)
            .catch(error => {
                console.error("Error in getHoaDonNam:", error);
                throw error;
            });
    }

    countHoaDonChuaHoanThanhTQ() {
        const url = `${API_BASE_URL}/hoa_don_chua_hoan_thanh`;
        return axios.get(url)
            .then(response => response.data)
            .catch(error => {
                console.error("Error in getHoaDonNam:", error);
                throw error;
            });
    }

    countDistinctTaiKhoanIdTQ() {
        const url = `${API_BASE_URL}/tong_so_nguoi_dung`;
        return axios.get(url)
            .then(response => response.data)
            .catch(error => {
                console.error("Error in getHoaDonNam:", error);
                throw error;
            });
    }

    countTopSanPhamBanChay() {
        const url = `${API_BASE_URL}/top_san_pham_ban_chay`;
        return axios.get(url)
            .then(response => response.data)
            .catch(error => {
                console.error("Error in getHoaDonNam:", error);
                throw error;
            });
    }

    hoaDonChuaXuLy() {
        const url = `${API_BASE_URL}/hoa_don_chua_xu_ly`;
        return axios.get(url)
            .then(response => response.data)
            .catch(error => {
                console.error("Error in getHoaDonNam:", error);
                throw error;
            });
    }

    toc_do_tang_truong() {
        const url = `${API_BASE_URL}/toc_do_tang_truong`;
        return axios.get(url)
            .then(response => response.data)
            .catch(error => {
                console.error("Error in getHoaDonNam:", error);
                throw error;
            });
    }


    toc_do_tang_truong_thang() {
        const url = `${API_BASE_URL}/toc_do_tang_truong_thang`;
        return axios.get(url)
            .then(response => response.data)
            .catch(error => {
                console.error("Error in getHoaDonNam:", error);
                throw error;
            });
    }

    toc_do_tang_truong_san_pham() {
        const url = `${API_BASE_URL}/toc_do_tang_truong_san_pham_nam`;

        return axios.get(url)
            .then(response => {
                // Lọc dữ liệu từ bản ghi thứ hai trở đi
                const dataFromSecondRecordOnward = response.data.slice(1);

                return dataFromSecondRecordOnward;
            })
            .catch(error => {
                console.error("Error in toc_do_tang_truong_san_pham:", error);
                throw error;
            });
    }


}

export default new ThongKeService();
