import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Header from './components/admin/Header';
import Sidebar from './components/admin/Sidebar';
import Footer from './components/admin/Footer';
import SanPhamComponent from "./components/sanphamComponent/SanPhamComponent";


function App() {
  return (
    <div className="header align-items-center">
        <Router>
            <Header />
            <Sidebar />

            <main id='main' className='main '>

                <Switch>
                    <Route path='/' exact component={SanPhamComponent}/>
                    <Route path='/index' component={SanPhamComponent}/>
                    <Route path='/detail/:id' component={SanPhamComponent}/>
                </Switch>


            </main>
            <Footer />
        </Router>
    </div>
  );
}

export default App;
