function Sidebar() {
    return (
        <aside id="sidebar" className="sidebar">

            <ul className="sidebar-nav" id="sidebar-nav">

                <li className="nav-item">
                    <a className="nav-link " href="index.html">
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
                            <a href="/">
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
                    <a className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse">
                        <i className="bi bi-receipt-cutoff"></i><span>Hóa đơn</span><i
                        className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul id="forms-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                        <li>
                            <a href="/hoadon">
                                <i className="bi bi-circle"></i><span>Quản lý hóa đơn</span>
                            </a>
                        </li>
                        <li>
                            <a href="forms-layouts.html">
                                <i className="bi bi-circle"></i><span>Lịch sử hóa đơn</span>
                            </a>
                        </li>
                    </ul>
                </li>

                <li className="nav-item">
                    <a className="nav-link collapsed" data-bs-target="#tables-nav" data-bs-toggle="collapse">
                        <i className="bi bi-layout-text-window-reverse"></i><span>Khuyến mãi</span><i
                        className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul id="tables-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                        <li>
                            <a href="/khuyenmai">
                                <i className="bi bi-circle"></i><span>Quản lý khuyến mãi</span>
                            </a>
                        </li>
                    </ul>
                </li>

                <li className="nav-item">
                    <a className="nav-link collapsed" data-bs-target="#charts-nav" data-bs-toggle="collapse">
                        <i className="bi bi-bar-chart"></i><span>Quản lý tài khoản</span><i
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
                    <a className="nav-link collapsed" data-bs-target="#charts-nav1" data-bs-toggle="collapse">
                        <i className="bi bi-bar-chart"></i><span>Thống kê</span><i
                        className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul id="charts-nav1" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                        <li>
                            <a href="/thongkedoanhthusanpham">
                                <i className="bi bi-circle"></i><span>Thống kê theo sản phẩm đã bán</span>
                            </a>
                            <a href="/khachhang">
                                <i className="bi bi-circle"></i><span>Thống kê doanh thu theo tháng</span>
                            </a>
                        </li>
                    </ul>
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
                    <a className="nav-link collapsed" href="pages-login.html">
                        <i className="bi bi-box-arrow-in-right"></i>
                        <span>Đăng xuất</span>
                    </a>
                </li>
            </ul>

        </aside>
    )
}

export default Sidebar