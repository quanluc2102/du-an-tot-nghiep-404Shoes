import React from "react";
import './style.css';
import { Link } from "react-router-dom";

function Dathangthanhcong() {
   return (
       <div className="success-container">
          <div className="success-message">
             <h2>ĐẶT HÀNG THÀNH CÔNG</h2>
             <p>Cảm ơn bạn đã mua hàng tại 404Shoes.</p>
             <p>Mã đơn hàng của bạn là: <span className="order-code">ABCDE123</span></p>
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
