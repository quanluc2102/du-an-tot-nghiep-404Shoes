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
import SanPhamDanhMucComponent from './components/sanphamdanhmuccomponent/SanPhamDanhMucComponent';

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
            <Route path='/sanphamdanhmuc' component={SanPhamDanhMucComponent} />
            

          </Switch>


        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
