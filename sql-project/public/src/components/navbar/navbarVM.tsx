import { useAuth } from '../context/AuthContext'; 

const useNavBar = () => {
  const { isRegistered, setIsRegistered } = useAuth();

  return {
    isRegistered,
    setIsRegistered,
  };
};

export default useNavBar;
