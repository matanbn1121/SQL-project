import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter, Route, Routes } from 'react-router'
import Login from './view/pages/login/Login.tsx'
import Register from './view/pages/register/Register.tsx'
import Home from './view/pages/home/Home.tsx'
import Products from './view/pages/products/products.tsx'
import Store from './view/pages/store/Store.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products/>}/>
        <Route path="/store" element={<Store/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
