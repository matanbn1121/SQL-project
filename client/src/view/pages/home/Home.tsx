import React from 'react'
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div>
        <img src="https://www.slr.co.il/images/logo_he.png" alt="" />
        <h1>ש.ל.ר תעשיות דפוטס בע"מ</h1>
        <h2><Link to="/register">הרשמת לקוח</Link></h2>
        <h2><Link to="/products">Let's Add Products (level 1)</Link></h2>
        <h2><Link to="/login">כניסה למערכת</Link></h2>
  
    </div>
  )
}

export default Home