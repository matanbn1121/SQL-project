import React from 'react'
import styles from "./welcomePage.module.scss";
import logo from "../../assets/logo_he.png";import useWelcomePageVM from './welcomePageVM';

const WelcomePage = () => {
    const { handleAddOrderClick, handleMyOrdersClick , clientId} = useWelcomePageVM();
  return (
    <div className={styles.nav_container}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="logo" className={styles.mainLogo} />
      </div>
      <p>Welcome Back {clientId?.[0]?.client_name || "משתמש"}</p>
      <div className={styles.buttonGroup}>
        <button className={styles.mainButton} onClick={handleAddOrderClick}>
          הוספת הזמנה
        </button>
        <button className={styles.mainButton} onClick={handleMyOrdersClick}>
          ההזמנות שלי
        </button>

      </div>
    </div>
  )
}

export default WelcomePage
