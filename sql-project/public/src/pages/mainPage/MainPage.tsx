import styles from "./mainPage.module.scss";
import NavBar from "../../components/navbar/navbar";
import logo from "../../assets/logo_he.png";
import useMainPageVM from "./mainPageVM";
import { useEffect, useState } from "react";
// import { Order } from "../../components/orderList/OrderList";

const MainPage = () => {
  const { handleAddOrderClick, handleMyOrdersClick , clientId} = useMainPageVM();

  // const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  return (
    <div className={styles.container}>
      <NavBar />
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
  </div>
  );
};

export default MainPage;
