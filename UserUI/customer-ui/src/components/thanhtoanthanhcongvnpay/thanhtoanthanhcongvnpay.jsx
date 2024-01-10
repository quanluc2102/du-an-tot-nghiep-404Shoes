import React, {useEffect} from "react";
import './style.css';
import { Link } from "react-router-dom";
import {GioHangService} from "../../service/GioHangService";

function Thanhtoanthanhcongvnpay() {
    useEffect(() => {
        // Lấy dữ liệu từ localStorage
        const storedHD = localStorage.getItem('hoanDonData');
        if (storedHD) {
            const hd = JSON.parse(storedHD);

            // Gọi hàm sold từ GioHangService với thông tin hóa đơn
            const thongBao = GioHangService.sold(hd);
            // Thực hiện các thao tác cần thiết sau khi tạo hóa đơn

            // Xóa dữ liệu từ localStorage sau khi đã sử dụng xong
            localStorage.removeItem('hoanDonData');
        }
    }, []); // useEffect sẽ chạy chỉ một lần sau khi component được mount

    return (
        <div className="payment-success-modal">
            <div className="modal-dim"></div>
            <div className="modal-wrap">
                <div className="modal-content success-content">
                    <img src="/img/success_icon.png" alt="" className="modal-content-icon" />
                    <div className="modal-content-text">Thanh toán thành công. Cảm ơn bạn đã sử dụng dịch vụ!</div>
                    <Link to="/thanhcong" className="modal-content-btn">Tiếp tục</Link>
                </div>
            </div>
        </div>
    );
}

export default Thanhtoanthanhcongvnpay;
