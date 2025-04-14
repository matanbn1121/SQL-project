// Register.tsx
import styles from "./register.module.scss";
import logo from "../../assets/logo_he.png";
import Button from "../../components/Button/Button";
import useRegisterVm from "./RegisterVM";

const Register = () => {
  const { handleBackClick, handleRegister } = useRegisterVm();

  return (
    <div className={styles.register}>
      <div className={styles.register_nav}>
        <button onClick={handleBackClick} className={styles.back}>
          ← חזור
        </button>

        <img src={logo} alt="לוגו" className={styles.logo} />
        <h2 className={styles.title}>הרשמה</h2>

        <form className={styles.form}>
          <input className={styles.input} type="text" name="first_name" placeholder="שם פרטי" required />
          <input className={styles.input} type="text" name="last_name" placeholder="שם משפחה" required />
          <input className={styles.input} type="text" name="company_name" placeholder="שם החברה" />
          <input className={styles.input} type="text" name="address" placeholder="כתובת" required />
          <input className={styles.input} type="text" name="phone" placeholder="טלפון" required />
          <input className={styles.input} type="email" name="email" placeholder="אימייל" required />
          <input className={styles.input} type="password" name="password" placeholder="סיסמה" required />
          <input className={styles.input} type="password" name="confirm_password" placeholder="אישור סיסמה" required />
          <Button onClick={handleRegister} text="צור חשבון" />
        </form>
      </div>
    </div>
  );
};

export default Register;
