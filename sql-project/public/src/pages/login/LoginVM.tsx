import { useNavigate } from "react-router-dom";

const useLoginVM = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/mainPage");
  };

  return {
    handleBackClick,
    handleLogin,
  };
};

export default useLoginVM;
