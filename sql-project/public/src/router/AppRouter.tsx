import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../pages/home/home';
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';
import MainPage from '../pages/mainPage/MainPage';
import AddOrder from '../components/AddOrder/AddOrder';
import OrderList from '../components/orderList/OrderList';
import WelcomePage from '../pages/welcomePage/welcomePage';
import AllOrderList from '../components/AllOrderList/AllOrderList';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        
        <Route path="/mainPage" element={<MainPage />}>
          <Route index element={<WelcomePage />} />
          <Route path="add-order" element={<AddOrder />} />
          <Route path="my-orders" element={<OrderList orders={[]} />} />
          <Route path="all-orders" element={<AllOrderList orders={[]} />} />
  
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
