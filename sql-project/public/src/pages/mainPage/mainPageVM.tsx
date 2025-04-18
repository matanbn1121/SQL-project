import { useNavigate } from "react-router-dom";

const useMainPageVM = () => {
  const navigate = useNavigate();

  const handleAddOrderClick = () => {
    navigate("/add-order-page");
  };

  const handleMyOrdersClick = () => {
    navigate("/my-orders-page");
  };

  return {
    handleAddOrderClick,
    handleMyOrdersClick,
  };
};

export default useMainPageVM;
