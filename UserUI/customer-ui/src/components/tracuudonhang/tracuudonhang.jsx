// import React from "react"
import './style.css'
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";

function Tracuudonhang(props) {
   const [orderId, setOrderId] = useState(null);
   const [errorMessage, setErrorMessage] = useState("");

   const handleSearchOrder = () => {
      const maDonHang = document.getElementById("order-code").value;
      const email = document.getElementById("input").value;

      axios
          .post("http://localhost:8080/hoa_don_chi_tiet/hien-thiguest", {
             maHoaDon: maDonHang,
             email: email,
          })
          .then((response) => {
             const orderDetails = response.data;
             // const idHD = orderDetails.id;
             console.log("id HD", orderDetails)
             if (orderDetails) {
                const orderId = orderDetails; // Lấy ID của hóa đơn từ thuộc tính hd
                setOrderId(orderId);
                setErrorMessage("");
                detail(); // Gọi hàm detail() ở đây để chuyển hướng
             } else {
                setOrderId(null);
                alert("Xin lỗi! Hệ thống không tìm thấy đơn hàng bạn muốn tra cứu. Vui lòng kiểm tra lại các thông tin đã nhập.");
             }
          })
          .catch((error) => {
             setOrderId(null);
             alert(
                 "Xin lỗi! Hệ thống không tìm thấy đơn hàng bạn muốn tra cứu. Vui lòng kiểm tra lại các thông tin đã nhập."
             );
             console.error("Error fetching data:", error);
          });
   };


   const detail = () => {
      if (orderId) {
         // Chuyển hướng đến trang chi tiết đơn hàng
         window.location.href = (`/billdetailguest/${orderId}`);
      }
   };
   return (

       <div className="container text-center card">
          <div className="row">
             <div className="title">TRA CỨU ĐƠN HÀNG</div>

             <div className="error-message" style={{ display: 'none' }} id="message-error-search-order">
                <div className="notice-text">
                   Xin lỗi! Hệ thống không tìm thấy đơn hàng bạn muốn tra cứu.<br /> Vui lòng kiểm tra lại các thông tin đã nhập.
                </div>
             </div>

             <div className="form-group">
                <div className="has-feedback">
                   <input required="" type="text" className="order-input text-uppercase" placeholder="Mã đơn hàng" id="order-code" />
                   <span></span>
                </div>
             </div>

             <div className="form-group">
                <div className="has-feedback">
                   <input required="" type="text" className="order-input" placeholder="Email" id="input" />
                   <span></span>
                </div>
             </div>

             <div className="search-button">
                <button className="btn btn-search-order" data-usersearchorder="" data-action="user-search-order" onClick={handleSearchOrder}>
                   TRA CỨU ĐƠN HÀNG
                </button>
             </div>

             <div className="col-xs-0 col-sm-4 col-md-4 col-lg-4"></div>

             <div className="additional-content col-xs-12 col-sm-4 col-md-4 col-lg-4"></div>
          </div>
       </div>

   )
}

export default Tracuudonhang;