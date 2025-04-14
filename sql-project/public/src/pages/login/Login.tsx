
import styles from "./login.module.scss";
import logo from "../../assets/logo_he.png";
import Button from "../../components/Button/Button";
import useLoginVm from "./LoginVM";

const Login = () => {
  const { handleBackClick, handleLogin } = useLoginVm();

  return (
    <div className={styles.login}>
      <div className={styles.login_nav}>
        <button onClick={handleBackClick} className={styles.back}>
          ← חזור
        </button>

        <img src={logo} alt="לוגו" className={styles.logo} />
        <h2 className={styles.title}>התחברות</h2>

        <form className={styles.form}>
          <input className={styles.input} type="email" name="email" placeholder="אימייל" required />
          <input className={styles.input} type="password" name="password" placeholder="סיסמה" required />
          <Button onClick={handleLogin} text="התחברות" />
        </form>
      </div>
    </div>
  );
};

export default Login;
