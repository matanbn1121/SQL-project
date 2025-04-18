import styles from "./mainPage.module.scss";
import NavBar from "../../components/navbar/navbar";
import logo from "../../assets/logo_he.png";
import useMainPageVM from "./mainPageVM";
import { useEffect, useState } from "react";
import { Order } from "../../components/orderList/OrderList";

const MainPage = () => {
  const { handleAddOrderClick, handleMyOrdersClick } = useMainPageVM();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:3000/main/fetchOrdersByClient");
        if (!response.ok) throw new Error("בעיה בטעינת ההזמנות");
        const data = await response.json();
        setOrders(data.result);
      } catch (err: any) {
        setError(err.message || "שגיאה לא צפויה");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className={styles.container}>
      <NavBar />
    <div className={styles.nav_container}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="logo" className={styles.mainLogo} />
      </div>
  
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
