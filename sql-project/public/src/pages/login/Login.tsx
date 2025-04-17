import styles from "./login.module.scss";
import logo from "../../assets/logo_he.png";
import Button from "../../components/Button/Button";
import useLoginVM from "./LoginVM";

const Login = () => {
  const {
    handleBackClick,
    handleSubmit,
    email,
    setEmail,
    password,
    setPassword,
  } = useLoginVM();

  return (
    <div className={styles.login}>
      <div className={styles.login_nav}>
        <button onClick={handleBackClick} className={styles.back}>
          ← חזור
        </button>

        <img src={logo} alt="לוגו" className={styles.logo} />
        <h2 className={styles.title}>התחברות</h2>

        {/* טופס אמיתי עם onSubmit */}
        <form className={styles.form} onSubmit={handleSubmit}>
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
          <Button text="התחברות" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default Login;
