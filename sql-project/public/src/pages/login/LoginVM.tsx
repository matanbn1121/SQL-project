import { useNavigate } from "react-router-dom";

const useLoginVM = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/main");
  };

  return {
    handleBackClick,
    handleLogin,
  };
};

export default useLoginVM;
