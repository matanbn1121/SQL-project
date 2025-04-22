import { Link, Outlet } from 'react-router-dom';
import useNavBar from './navbarVM';
import styles from './navbar.module.scss';
import logo from '../../assets/logo_he.png';

const NavBar = () => {
  const { isRegistered, setIsRegistered,go_to_home_page } = useNavBar();

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
  <img onClick={go_to_home_page}src={logo} alt="logo" className={styles.logo} />

  <div className={styles.navButtons}>{isRegistered ? (<Link className="btn" to="/login"> התחברות   </Link>  ) : (    <button className="btn" onClick={handleLogout}>        התנתקות      </button> 
)}
    
    <Link to="/mainPage/my-orders">ההזמנות שלי</Link>
    <Link to="/mainPage/add-order">הוספת הזמנה</Link>
    <Link to="/mainPage">בית</Link>
    <p></p>
  </div>

</div>
  );
};

export default NavBar;
