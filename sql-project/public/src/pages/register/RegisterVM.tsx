import { useNavigate } from "react-router-dom";

const useRegisterVM = () => {
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

export default useRegisterVM;
