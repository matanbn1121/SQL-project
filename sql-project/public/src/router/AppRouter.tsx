import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../pages/home/home';
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
