// App.js
import React, { useState } from 'react';
import LoginComponent from './components/LoginComponent/LoginComponent';

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import Header from './components/admin/Header';
import Sidebar from './components/admin/Sidebar';
import Footer from './components/admin/Footer';
import SanPhamComponent from "./components/sanphamComponent/SanPhamComponent";
import ChiTietComponent from "./components/sanphamComponent/ChiTietComponent";
import ListDanhMucComponent from './components/danhmuccomponent/ListDanhMucComponent';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MauSacComponent from './components/mausaccomponent/MauSacComponent';
import KichThuocComponent from './components/kichthuoccomponent/KichThuocComponent';
import ThuongHieuComponent from './components/thuonghieucomponent/ThuongHieuComponent';
import XuatXuComponent from './components/xuatxucomponent/XuatXuComponent';
import SanPhamCTComponent from './components/spctcomponent/SanPhamCTComponent';
import TaiKhoanComponent from "./components/taikhoancomponent/TaiKhoanComponent";
import KhuyenMaiComponents from "./components/khuyenmaicomponent/KhuyenMaiComponents";
import KhuyenMaiComponentAdd from "./components/khuyenmaicomponent/KhuyenMaiComponentAdd";
import ImageUpload from "./components/ImageUpload";
import SanPhamAddComponent from "./components/sanphamComponent/SanPhamAddComponnent";
import PhanQuyenComment from "./components/PhanQuyenComment/PhanQuyenComment";
import NhanVienComponent from "./components/taikhoancomponent/NhanVienComponent";
import KhachHangComponent from "./components/taikhoancomponent/KhachHangComponent";
import QuanLyComponent from "./components/taikhoancomponent/QuanLyComponent";
import HoaDonChiTietComponents from "./components/hoadonchitietcomponents/HoaDonChiTietComponents";
import ThongKeDoanhThuSanPham from "./components/thongkecomponent/ThongKeDoanhThuSanPham";
import ThongTinComponent from "./components/thongtincomponent/ThongTinComponent";
import TaiKhoanQuanLyComponent from "./components/taikhoancomponent/TaiKhoanQuanLyComponent";
import TaiKhoanQLUpdate from "./components/taikhoancomponent/TaiKhoanQLUpdate";
import TaiKhoanNVComponent from "./components/taikhoancomponent/TaiKhoanNVComponent";
import TaiKhoanNVUpdate from "./components/taikhoancomponent/TaiKhoanNVUpdate";
import TaiKhoanKHComponent from "./components/taikhoancomponent/TaiKhoanKHComponent";
import TaiKhoanKHUpdate from "./components/taikhoancomponent/TaiKhoanKHUpdate";
import BanHangOffline from './components/banhangoffline/banhang';
import TrangTongQuan from "./components/trangtongquan/TrangTongQuan";
import HoaDonComponents from "./components/hoadoncomponents/HoaDonComponents";
import KhuyenMaiComponent from "./components/khuyenmaicomponent/KhuyenMaiComponent";
import ForgotPasswordComponent from "./components/LoginComponent/ForgotPasswordComponent";
import UserInfo from "./components/LoginComponent/UserInfo";
function App() {
    const [isLoggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));

    const handleLogin = () => {
        setLoggedIn(true);
    };

    const handleLogout = () => {
        // Thực hiện đăng xuất, xóa token khỏi localStorage
        localStorage.removeItem('token');
        setLoggedIn(false);
    };

    return (
        <div className="header align-items-center">
            <ToastContainer />
            {isLoggedIn ? (
                <>

                    <Router>
                        <Header />
                        <Sidebar />
                        <main id='main' className='main '>
                            <Route
                                render={({ location }) =>
                                    !location.pathname.includes('/banhangoffline') && <Sidebar />
                                } />
                            <Switch>
                                <Route path='/' exact component={TrangTongQuan} />
                                <Route path='/index' component={SanPhamComponent} />
                                <Route path='/detail/:id' component={ChiTietComponent} />
                                <Route path='/sanpham/formadd' component={SanPhamAddComponent} />
                                <Route path='/danhmuc' component={ListDanhMucComponent} />
                                <Route path='/danhmucdetail/:id' component={ListDanhMucComponent} />
                                <Route path='/mausac' component={MauSacComponent} />
                                <Route path='/mausacdetail/:id' component={MauSacComponent} />
                                <Route path='/kichthuoc' component={KichThuocComponent} />
                                <Route path='/kichthuocdetail/:id' component={KichThuocComponent} />
                                <Route path='/thuonghieu' component={ThuongHieuComponent} />
                                <Route path='/thuonghieudetail/:id' component={ThuongHieuComponent} />
                                <Route path='/xuatxu' component={XuatXuComponent} />
                                <Route path='/xuatxudetail/:id' component={XuatXuComponent} />
                                <Route path='/sanphamchitiet' component={SanPhamCTComponent} />
                                <Route path='/sanphamchitietdetail/:id' component={SanPhamCTComponent} />
                                <Route path='/taikhoan' component={TaiKhoanComponent} />
                                <Route path='/taikhoandetail/:id' component={TaiKhoanComponent} />
                                <Route path='/khuyenmai' component={KhuyenMaiComponents} />
                                <Route path='/khuyenmaiadd' component={KhuyenMaiComponentAdd} />
                                <Route path='/khuyenmaidetail/:id' component={KhuyenMaiComponent} />
                                <Route path='/hoadon' component={HoaDonComponents} />
                                <Route path='/anh' component={ImageUpload} />
                                <Route path='/phanquyen' component={PhanQuyenComment} />
                                <Route path='/nhanvien' component={NhanVienComponent} />
                                <Route path='/quanly' component={QuanLyComponent} />
                                <Route path='/addQuanLy' component={TaiKhoanQuanLyComponent} />
                                <Route path='/addNhanVien' component={TaiKhoanNVComponent} />
                                <Route path='/addKhachHang' component={TaiKhoanKHComponent} />
                                <Route path='/quanlydetail/:id' component={TaiKhoanQLUpdate} />
                                <Route path='/nhanviendetail/:id' component={TaiKhoanNVUpdate} />
                                <Route path='/khachhangdetail/:id' component={TaiKhoanKHUpdate} />
                                <Route path='/khachhang' component={KhachHangComponent} />
                                <Route path='/thongtindetail/:id' component={ThongTinComponent} />
                                <Route path='/thongtin' component={ThongTinComponent} />
                                <Route path='/phanquyendetail/:id' component={PhanQuyenComment} />
                                <Route path='/HoaDonChiTiet/:id' component={HoaDonChiTietComponents} />
                                <Route path='/thongke' component={ThongKeDoanhThuSanPham} />
                                <Route path='/banhangoffline' component={BanHangOffline} />
                                <Route path='/tongquan' component={TrangTongQuan} />>
                                <Route path='/userinfo' component={UserInfo} />
                                <Route path='/forgot-password' component={ForgotPasswordComponent} />
                                <Redirect to="/" />
                            </Switch>
                        </main>
                    </Router>
                </>
            ) : (
                <LoginComponent onLogin={handleLogin} onLogout={handleLogout} />
            )}
        </div>
    );
}

export default App;
