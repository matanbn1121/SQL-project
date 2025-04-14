import Button from "../../components/Button/Button";
import styles from "./home.module.scss";
import logo from "../../assets/logo_he.png";
import { useHomeVM } from "./homeVM";





const Home = () => {
    const { goToRegister, goToLogin } = useHomeVM();
  
    return (
      <div className={styles.home}>
        <div className={styles.home_nav}>
          <img src={logo} alt="לוגו" className={styles.logo} />
          <div className={styles.buttons}>
            <Button text="הרשמה" onClick={goToRegister} />
            <Button text="התחברות" onClick={goToLogin} />
          </div>
        </div>
      </div>
    );
  };
  
  export default Home;


