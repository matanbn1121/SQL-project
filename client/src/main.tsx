import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter, Route, Routes } from 'react-router'
import Login from './view/pages/login/Login.tsx'
import Register from './view/pages/register/Register.tsx'
import Home from './view/pages/home/Home.tsx'
import Products from './view/pages/products/products.tsx'
import Orders from './view/pages/orders/Orders.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products/>}/>
        <Route path="/orders" element={<Orders/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
