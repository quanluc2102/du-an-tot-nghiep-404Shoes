import React from "react";
import './style.css';
import { Link } from "react-router-dom";

function Thanhtoanthanhcongvnpay() {
    return (
        <div className="payment-success-modal">
            <div className="modal-dim"></div>
            <div className="modal-wrap">
                <div className="modal-content success-content">
                    <img src="/img/success_icon.png" alt="" className="modal-content-icon" />
                    <div className="modal-content-text">Thanh toán thành công. Cảm ơn bạn đã sử dụng dịch vụ!</div>
                    <Link to="/" className="modal-content-btn">Tiếp tục</Link>
                </div>
            </div>
        </div>
    );
}

export default Thanhtoanthanhcongvnpay;
