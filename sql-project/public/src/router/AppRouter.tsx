import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../pages/home/home';
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';
import MainPage from '../pages/mainPage/MainPage';
import AddOrder from '../components/AddOrder/AddOrder';
import OrderList from '../components/orderList/OrderList';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mainPage" element={<MainPage />} />
        <Route path="/add-order-page" element={<AddOrder />} />
        <Route path="/my-orders-page" element={<OrderList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
