import styles from "./mainPage.module.scss";
import NavBar from "../../components/navbar/navbar";
import logo from "../../assets/logo_he.png";
import useMainPageVM from "./mainPageVM";

const MainPage = () => {
  const { handleAddOrderClick, handleMyOrdersClick } = useMainPageVM();

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
