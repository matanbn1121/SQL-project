import styles from "./AddOrderPage.module.scss";
import NavBar from "../../components/navbar/navbar"; 
import logo from "../../assets/logo_he.png";

import AddOrder from "../../components/AddOrder/AddOrder"; 

const AddOrderPage = () => {
    return (
        <div>         <NavBar /> 
      <div className={styles.container}>

        <div className={styles.nav_container}>
          <div className={styles.logoContainer}>
            <img src={logo} alt="logo" className={styles.mainLogo} />
          </div>
          <AddOrder />
        </div>
      </div>
      </div>
    );
  };
  

export default AddOrderPage;
