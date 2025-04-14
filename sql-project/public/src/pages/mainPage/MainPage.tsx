import { useEffect, useState } from "react";
import styles from "./mainPage.module.scss";
import logo from "../../assets/logo_he.png";
import Button from "../../components/Button/Button";
import useMainVM from "./mainPageVM";
import AddOrder from "../../components/AddOrder/AddOrder";
import OrderList from "../../components/orderList/OrderList";

interface Order {
  order_id: string;
  client_id: string;
  order_date: string;
  delivery_date: string;
  praises: string;
  knives_id: string;
  engravings_id: string;
  sticker_id: string;
  arrival_date: string;
  sticker_quantity: string;
  knives_quantity: string;
  materials_type: string;
}

const MainPage = () => {
  const { handleBackClick } = useMainVM();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:3001/orders");
        if (!response.ok) throw new Error("בעיה בטעינת ההזמנות");
        const data = await response.json();
        setOrders(data);
      } catch (err: any) {
        setError(err.message || "שגיאה לא צפויה");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className={styles.mainPage}>
   

      <div className={styles.mainPage_content}>
        <AddOrder />

        {loading ? (
          <p className={styles.loading}>טוען הזמנות...</p>
        ) : error ? (
          <p className={styles.error}>שגיאה: {error}</p>
        ) : (
          <div className={styles.orderList}>
            <OrderList orders={orders} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPage;
