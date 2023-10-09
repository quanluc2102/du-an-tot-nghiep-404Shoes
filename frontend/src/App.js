import logo from './logo.svg';
import './App.css';
import Header from './components/admin/Header';
import Sidebar from './components/admin/Sidebar';
import Footer from './components/admin/Footer';
import Dashboard from './components/admin/Dashboard';
import ListDanhMucComponent from './components/danhmuccomponent/ListDanhMucComponent';


function App() {
  return (
    <div className="header align-items-center">
      <Sidebar />
      <Header />
      <div id='sidebar-nav' className='sidebar-nav'>
      
      
      <div className='main '>
      
        <ListDanhMucComponent />
        
      
      </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
