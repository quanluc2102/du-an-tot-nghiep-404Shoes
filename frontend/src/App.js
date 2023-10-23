import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/admin/Header';
import Sidebar from './components/admin/Sidebar';
import Footer from './components/admin/Footer';
import SanPhamComponent from "./components/sanphamComponent/SanPhamComponent";
import ListDanhMucComponent from './components/danhmuccomponent/ListDanhMucComponent';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MauSacComponent from './components/mausaccomponent/MauSacComponent';
import KichThuocComponent from './components/kichthuoccomponent/KichThuocComponent';
import ThuongHieuComponent from './components/thuonghieucomponent/ThuongHieuComponent';
import XuatXuComponent from './components/xuatxucomponent/XuatXuComponent';
import SanPhamCTComponent from './components/spctcomponent/SanPhamCTComponent';
import TaiKhoanComponent from "./components/taikhoancomponent/TaiKhoanComponent";
import KhuyenMaiComponent from "./components/khuyenmaicomponent/KhuyenMaiComponent";
import HoaDonComponents from './components/hoadoncomponents/HoaDonComponents';
import KhuyenMaiComponents from "./components/khuyenmaicomponent/KhuyenMaiComponents";
import KhuyenMaiComponentAdd from "./components/khuyenmaicomponent/KhuyenMaiComponentAdd";
import ImageUpload from "./components/ImageUpload";
import SanPhamAddComponent from "./components/sanphamComponent/SanPhamAddComponnent";
function App() {
  return (

    <div className="header align-items-center">
      <ToastContainer />
      <Router>

        <Header />
        <Sidebar />

        <main id='main' className='main '>

          <Switch>
            <Route path='/' exact component={SanPhamComponent} />
            <Route path='/index' component={SanPhamComponent} />
            <Route path='/detail/:id' component={SanPhamComponent} />
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
          </Switch>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
