import './App.css';
import Home from './components/home/home'
import ProductList from './components/productList/productList';
import ProductDetail from './components/productDetail/productDetail';
import Cart from './components/cart/cart';
import UserInformation from './components/userInformation/userInformation';
import Login from './components/login/login';
import Register from './components/register/register';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/product-list' component={ProductList} />
        <Route path='/your-cart' component={Cart} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/product-detail' component={ProductDetail} />
        <Route path='/user-info' component={UserInformation} />
      </Switch>
    </Router>
  );
}

export default App;
