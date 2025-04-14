import { useNavigate } from "react-router-dom";

export const useHomeVM = () => {
  const navigate = useNavigate();

  const goToRegister = () => {
    navigate("/register");
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return {
    goToRegister,
    goToLogin,
  };
};
