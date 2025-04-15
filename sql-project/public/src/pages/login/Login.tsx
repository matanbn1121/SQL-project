
import styles from "./login.module.scss";
import logo from "../../assets/logo_he.png";
import Button from "../../components/Button";
import { useState } from "react";
import useLoginVM from "./LoginVM";

const Login = () => {
  const { handleBackClick, handleLogin } = useLoginVM();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={styles.login}>
      <div className={styles.login_nav}>
        <button onClick={handleBackClick} className={styles.back}>
          ← חזור
        </button>

        <img src={logo} alt="לוגו" className={styles.logo} />
        <h2 className={styles.title}>התחברות</h2>

        <div className={styles.form}>
          <input
            className={styles.input}
            type="email"
            placeholder="אימייל"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className={styles.input}
            type="password"
            placeholder="סיסמה"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button text="התחברות" onClick={() => handleLogin(email, password)} />
        </div>
      </div>
    </div>
  );
};

export default Login;