import styles from "./MyOrderPage.module.scss"; 
import NavBar from "../../components/navbar/navbar";
import OrderList from "../../components/orderList/OrderList";
import useOrderListVM from "../../components/orderList/OrderListVM;

const MyOrderPage = () => {
  const { orders, loading, error } = useOrderListVM();

  return (
    <div className={styles.container}> 
      <NavBar />

      {loading ? (
        <p>טוען הזמנות...</p>
      ) : error ? (
        <p style={{ color: "red" }}>שגיאה: {error}</p>
      ) : (
        <OrderList orders={orders} />
      )}
    </div>
  );
};

export default MyOrderPage;
