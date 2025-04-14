import { useNavigate } from "react-router-dom";

const useMainVM = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  const handleRegister = () => {
    navigate("/login");
  };

  return {
    handleBackClick,
    handleRegister,
  };
};

export default useMainVM;
