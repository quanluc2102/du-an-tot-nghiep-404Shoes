import React, { useState, useEffect } from "react";
import './style.css';
import { Link } from "react-router-dom";

function Dathangthanhcong() {
    const [orderCode, setOrderCode] = useState("");

    useEffect(() => {
        // Gọi API để lấy mã đơn hàng từ server
        fetchOrderCode();
    }, []);

    const fetchOrderCode = async () => {
        try {
            const response = await fetch("http://localhost:8080/khach_hang_page/dat_hang_thanh_cong"); // Thay yourId bằng ID của đơn hàng cần hiển thị
            const data = await response.json();

            // Kiểm tra xem có mã đơn hàng không
            if (data && data.length > 0) {
                setOrderCode(data[0]);
            }
        } catch (error) {
            console.error("Error fetching order code:", error);
        }
    };

    return (
        <div className="success-container">
            <div className="success-message">
                <h2>ĐẶT HÀNG THÀNH CÔNG</h2>
                <p>Cảm ơn bạn đã mua hàng tại 404Shoes.</p>
                <p>Mã đơn hàng của bạn là: <span className="order-code">{orderCode}</span></p>
                <p>Nhân viên của chúng tôi sẽ sớm liên hệ với Quý khách trong thời gian sớm nhất.</p>
                <p className="note">Khi đơn hàng đã được xác nhận và giao hàng, đơn hàng sẽ không thể hủy.</p>
                <p>Nếu quý khách có thắc mắc, vui lòng liên hệ với chúng tôi.</p>
                <p>Xin chân thành cảm ơn quý khách.</p>
            </div>
            <div className="button-container">
                <Link to="/" className="home-button"><img src="/img/home-icon.png" alt="Home" /> Quay trở lại trang chủ</Link>
                <Link to="/tracuudonhang" className="tracking-button"><img src="/img/tracking-icon.png" alt="Tracking" /> Theo dõi đơn hàng</Link>
            </div>
        </div>
    );
}

export default Dathangthanhcong;

