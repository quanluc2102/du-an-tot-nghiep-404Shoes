import React from 'react';
import { useHistory } from 'react-router-dom';

function Sidebar() {
    const history = useHistory();

    const handleLogout = () => {
        // Thực hiện các thao tác đăng xuất, ví dụ: xóa token từ localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');

        // Chuyển hướng người dùng về trang đăng nhập
        window.location.href = (`/login`);
    };


    return (
        <aside id="sidebar" className="sidebar">

            <ul className="sidebar-nav" id="sidebar-nav">

                <li className="nav-item">
                    <a className="nav-link " href="/tongquan">
                        <i className="bi bi-grid"></i>
                        <span>Tổng quan</span>
                    </a>
                </li>

                <li className="nav-item">
                    <a className="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse">
                        <i className="bi bi-menu-button-wide"></i><span>Quản lý sản phẩm</span><i
                        className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul id="components-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                        <li>
                            <a href="/index">
                                <i className="bi bi-circle"></i><span>Sản phẩm</span>
                            </a>
                        </li>
                        <li>
                            <a href="/mausac">
                                <i className="bi bi-circle"></i><span>Màu sắc</span>
                            </a>
                        </li>
                        <li>
                            <a href="/kichthuoc">
                                <i className="bi bi-circle"></i><span>Kích thước</span>
                            </a>
                        </li>
                        <li>
                            <a href="/thuonghieu">
                                <i className="bi bi-circle"></i><span>Thương hiệu</span>
                            </a>
                        </li>
                        <li>
                            <a href="/xuatxu">
                                <i className="bi bi-circle"></i><span>Xuất xứ</span>
                            </a>
                        </li>
                        <li>
                            <a href="/danhmuc">
                                <i className="bi bi-circle"></i><span>Danh mục</span>
                            </a>
                        </li>
                    </ul>
                </li>

                <li className="nav-item">
                    <a className="nav-link collapsed" href="/hoadon">
                        <i className="bi bi-receipt-cutoff"></i>
                        <span>Quản lý hóa đơn</span>
                    </a>
                </li>

                <li className="nav-item">
                    <a className="nav-link collapsed" href="/banhangoffline">
                        <i className="bi bi-cart"></i>
                        <span>Bán hàng tại quầy</span>
                    </a>
                </li>


                <li className="nav-item">
                    <a className="nav-link collapsed" href="/khuyenmai">
                        <i className="bi bi-ticket-perforated"></i>
                        <span>Khuyến mãi</span>
                    </a>
                </li>

                <li className="nav-item">
                    <a className="nav-link collapsed" data-bs-target="#charts-nav" data-bs-toggle="collapse">
                        <i className="bi bi-people"></i><span>Quản lý tài khoản</span><i
                        className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul id="charts-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                        <li>
                            <a href="/nhanvien">
                                <i className="bi bi-circle"></i><span>Nhân viên</span>
                            </a>
                            <a href="/khachhang">
                                <i className="bi bi-circle"></i><span>Khách hàng</span>
                            </a>
                        </li>
                    </ul>
                </li>

                <li className="nav-item">
                    <a className="nav-link collapsed" href="/thongke">
                        <i className="bi bi-bar-chart-line"></i>
                        <span>Thống kê</span>
                    </a>
                </li>

                <li className="nav-heading">Người dùng</li>

                <li className="nav-item">
                    <a className="nav-link collapsed" href="users-profile.html">
                        <i className="bi bi-person"></i>
                        <span>Thông tin nhân viên</span>
                    </a>
                </li>


                {/* <li className="nav-item">
        <a className="nav-link collapsed" href="pages-faq.html">
          <i className="bi bi-question-circle"></i>
          <span>F.A.Q</span>
        </a>
      </li>

      <li className="nav-item">
        <a className="nav-link collapsed" href="pages-contact.html">
          <i className="bi bi-envelope"></i>
          <span>Contact</span>
        </a>
      </li>

      <li className="nav-item">
        <a className="nav-link collapsed" href="pages-register.html">
          <i className="bi bi-card-list"></i>
          <span>Register</span>
        </a>
      </li> */}

                <li className="nav-item">
                    <a className="nav-link collapsed" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-in-right"></i>
                        <span>Đăng xuất</span>
                    </a>
                </li>
            </ul>

        </aside>
    )
}

export default Sidebar