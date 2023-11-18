import './App.css';
import Home from './components/home/home'
import ProductList from './components/productList/productList';
import ProductDetail from './components/productDetail/productDetail';
import Cart from './components/cart/cart';
import UserInformation from './components/userInformation/userInformation';
import Login from './components/login/login';
import Register from './components/register/register';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ErrorPage from './components/error/errorpage';
import { Redirect } from 'react-router-dom/cjs/react-router-dom';
import Payment from './components/payment/payment';

function App() {
  return (
    <Router>
      <Switch>
        <Redirect exact from='/' to='/home' />
        <Route path='/home' component={Home} />
        <Route path='/product-list' component={ProductList} />
        <Route path='/your-cart' component={Cart} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/product-detail' component={ProductDetail} />
        <Route path='/user-info' component={UserInformation} />
        <Route path='/payment' component={Payment}/>
        <Route path='*' component={ErrorPage} />
      </Switch>
    </Router>
  );
}

export default App;
