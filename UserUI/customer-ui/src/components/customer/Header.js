import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom/cjs/react-router-dom";
import {useHistory} from 'react-router-dom';
import {GioHangService} from "../../service/GioHangService";
import {da} from "date-fns/locale";
import {SanPhamService} from "../../service/SanPhamService";

function Header() {
    const [SPCT, setSPCT] = useState([]);
    const handleLogout = () => {
        // Thực hiện các thao tác đăng xuất, ví dụ: xóa token từ localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
        alert("Cảm ơn đã ghé thăm");
        // Chuyển hướng người dùng về trang đăng nhập
        window.location.href = (`/login`);
    };

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    useEffect(() => {
        const fetchData = async () => {
            const storedDataUser = localStorage.getItem('currentUser');
            const dataUser = storedDataUser ? JSON.parse(storedDataUser) : [];
            let data;

            if (storedDataUser) {
                data = await GioHangService.getGHOne(dataUser.id);
            } else {
                data = JSON.parse(localStorage.getItem('listSPCT'));
            }

            setSPCT(data);
        };

        fetchData();
    }, [SPCT]);

    return (
        <header>
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid justify-content-end">
                    {currentUser ? (
                        // Nếu có dữ liệu trong localStorage, hiển thị nút "Đăng xuất" và "Tài khoản"
                        <>
                            <Link style={{textDecoration: 'none'}}>
                                <a className="navbar-brand" href="#" style={{fontSize: '13px'}} onClick={handleLogout}>
                                    <i className='bx bxs-log-out'></i> Đăng xuất
                                </a>
                            </Link>
                            <Link to="/account" style={{textDecoration: 'none'}}>
                                <a className="navbar-brand" href="#" style={{fontSize: '13px'}}>
                                    <i className='bx bxs-user'></i> Tài khoản
                                </a>
                            </Link>
                        </>
                    ) : (
                        // Nếu không có dữ liệu trong localStorage, hiển thị nút "Đăng nhập"
                        <Link to="/login" style={{textDecoration: 'none'}}>
                            <a className="navbar-brand" href="#" style={{fontSize: '13px'}}>
                                <i className='bx bxs-log-in'></i> Đăng nhập
                            </a>
                        </Link>
                    )}
                    <Link to='/your-cart/6' style={{textDecoration: 'none'}}>
                        <a className="navbar-brand" href="/your-cart/2" style={{fontSize: '13px'}}
                           >
                            <i className='bx bxs-cart'></i>Giỏ hàng {`(${SPCT.length})`}
                            {/*<i className='bx bxs-cart' style={{display:"none"}}>{soLuongSPTrongGio()}</i>*/}
                        </a>
                    </Link>
                </div>
            </nav>

            <nav className="navbar navbar-expand-lg navbar-light bg-0 py-1" id="navbarhead"
                 style={{backgroundColor: 'rgb(255, 255, 255)'}}>
                <div className="container">
                    <div className="d-flex justify-content-between align-items-left w-100"
                         style={{marginRight: '10px'}}>
                        <Link to='/' style={{textDecoration: 'none'}}> <a
                            className="navbar-brand d-flex align-items-center">
                            <img style={{width: '90px'}}
                                 src="https://t3.ftcdn.net/jpg/00/71/53/56/360_F_71535683_03OP8nG0N3YRVDTasetbEfT2BpucFmo5.jpg"
                                 alt="site icon"/>
                            <a className="text-uppercase text-decoration-none brand text-black"
                               style={{fontWeight: 'bold', fontSize: '26px'}}>404SHOES</a>
                        </a>
                        </Link>
                    </div>

                    <div className="collapse navbar-collapse justify-content-center" id="navMenu">
                        <ul className="navbar-nav mx-auto text-center">
                            <li className="nav-item px-1 py-1">

                                <Link to='/' style={{textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1em'}}>
                                    <a className="nav-link text-uppercase">TRANG CHỦ</a>
                                </Link>

                            </li>
                            <li className="nav-item px-1 py-1">
                                <Link to='/product-list'
                                      style={{textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1em'}}>
                                    <a className="nav-link text-uppercase">SẢN PHẨM</a>
                                </Link>
                            </li>
                            <li className="nav-item px-1 py-1">
                                <Link to='/product-list'
                                      style={{textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1em'}}>
                                    <a className="nav-link text-uppercase">BÀI VIẾT</a>
                                </Link>
                            </li>
                            <li className="nav-item px-1 py-1">
                                <Link to='/product-list'
                                      style={{textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1em'}}>
                                    <a className="nav-link text-uppercase">LIÊN HỆ</a>
                                </Link>
                            </li>
                            <li className="nav-item px-1 py-1">
                                <Link to='/tracuudonhang'
                                      style={{textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1em'}}>
                                    <a className="nav-link text-uppercase">TRA CỨU ĐƠN HÀNG</a>
                                </Link>
                            </li>
                            <li className="nav-item px-1 py-1">
                                <Link to='/product-list'
                                      style={{textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1em'}}>
                                    <a className="nav-link text-uppercase">VỀ CHÚNG TÔI</a>
                                </Link>
                            </li>
                            <li className="nav-item px-1 py-1" style={{marginLeft: '65px'}}>
                                <form className="d-flex">
                                    <input className="form-control me-2" type="search" placeholder="Tìm kiếm..."
                                           aria-label="Search" style={{width: '200px'}}/>
                                    <button className="btn btn-outline-success" type="submit">Search</button>
                                </form>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>

    )
}

export default Header