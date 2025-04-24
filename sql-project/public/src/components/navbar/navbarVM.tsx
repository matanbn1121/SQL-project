import { useAuth } from '../context/AuthContext'; 
import { useNavigate } from "react-router-dom";

const useNavBar = () => {
  const { isRegistered, setIsRegistered } = useAuth();
  const navigate = useNavigate();

  function go_to_home_page(){
    navigate("/mainPage");
  }

  return {
    isRegistered,
    setIsRegistered,
    go_to_home_page
  };
};

export default useNavBar;
