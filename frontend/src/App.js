import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Header from './components/admin/Header';
import Sidebar from './components/admin/Sidebar';
import Footer from './components/admin/Footer';
import SanPhamComponent from "./components/sanphamComponent/SanPhamComponent";
import ListDanhMucComponent from './components/danhmuccomponent/ListDanhMucComponent';
import { ToastContainer, toast } from 'react-toastify';
import SanPhamCTComponent from "./components/spctcomponent/SanPhamCTComponent";

function App() {
  return (
    <div className="header align-items-center">
        <Router>
        <ToastContainer />
            <Header />
            <Sidebar />

            <main id='main' className='main '>

                <Switch>
                    <Route path='/' exact component={SanPhamComponent}/>
                    <Route path='/index' component={SanPhamComponent}/>
                    <Route path='/detail/:id' component={SanPhamComponent}/>
                    <Route path='/danhmuc' component={ListDanhMucComponent}/>
                    <Route path='/danhmucdetail/:id' component={ListDanhMucComponent}/>
                    <Route path='/san_pham_chi_tiet' component={SanPhamCTComponent}/>
                    <Route path='/san_pham_chi_tiet_detail/:id' component={SanPhamCTComponent}/>
                </Switch>


            </main>
            <Footer />
        </Router>
    </div>
  );
}

export default App;
