import styles from "./register.module.scss";
import logo from "../../assets/logo_he.png";
import Button from "../../components/Button/Button";
import { useRegisterVM } from "../register/RegisterVM";

function Register() {
  const {
    firstName, setFirstName,
    lastName, setLastName,
    companyName, setCompanyName,
    address, setAddress,
    phone, setPhone,
    email, setEmail,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    handleSubmit
  } = useRegisterVM();

  return (
    <div className={styles.register}>
      <div className={styles.register_nav}>
        <button className={styles.back}>← חזור</button>
        <img src={logo} alt="לוגו" className={styles.logo} />
        <h2 className={styles.title}>הרשמה</h2>

        <div className={styles.form}>
          <input type="text" placeholder="שם פרטי" required value={firstName} onChange={(e) => setFirstName(e.target.value)} className={styles.input} />
          <input type="text" placeholder="שם משפחה" required value={lastName} onChange={(e) => setLastName(e.target.value)} className={styles.input} />
          <input type="text" placeholder="שם החברה" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className={styles.input} />
          <input type="text" placeholder="כתובת" required value={address} onChange={(e) => setAddress(e.target.value)} className={styles.input} />
          <input type="text" placeholder="טלפון" required value={phone} onChange={(e) => setPhone(e.target.value)} className={styles.input} />
          <input type="email" placeholder="אימייל" required value={email} onChange={(e) => setEmail(e.target.value)} className={styles.input} />
          <input type="password" placeholder="סיסמה" required value={password} onChange={(e) => setPassword(e.target.value)} className={styles.input} />
          <input type="password" placeholder="אישור סיסמה" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={styles.input} />

          <Button text="צור חשבון" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}

export default Register;
