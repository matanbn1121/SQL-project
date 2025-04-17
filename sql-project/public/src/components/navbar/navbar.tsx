import { Link } from 'react-router-dom';
import useNavBar from './navbarVM';
import styles from './navbar.module.scss';
import logo from '../../assets/logo_he.png';

const NavBar = () => {
  const { isRegistered, setIsRegistered } = useNavBar();

  const handleLogout = async () => {
    await fetch('http://localhost:3000/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
    setIsRegistered(false);
    window.location.href = '/';
  };

  return (
<div className={styles.main}>
  <img src={logo} alt="logo" className={styles.logo} />

  <div className={styles.navButtons}>
    {!isRegistered ? (
      <Link className="btn" to="/login">
        התחברות
      </Link>
    ) : (
      <button className="btn" onClick={handleLogout}>
        התנתקות
      </button>
    )}
    <Link to="/my-orders-page">ההזמנות שלי</Link>
    <Link to="/add-order-page">הוספת הזמנה</Link>
    <Link to="/mainPage">בית</Link>
  </div>
</div>
  );
};

export default NavBar;
