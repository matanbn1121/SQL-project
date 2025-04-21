import styles from "./mainPage.module.scss";
import NavBar from "../../components/navbar/navbar";
import logo from "../../assets/logo_he.png";
import useMainPageVM from "./mainPageVM";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
// import { Order } from "../../components/orderList/OrderList";

const MainPage = () => {
  const { handleAddOrderClick, handleMyOrdersClick , clientId} = useMainPageVM();

  // const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  return (
    <div className={styles.container}>
      <NavBar />
      <Outlet/>
  </div>

  );
};

export default MainPage;
