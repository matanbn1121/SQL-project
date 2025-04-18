import { useNavigate } from "react-router-dom";

const useAddOrderPageVM = () => {
  const navigate = useNavigate();

  const handleAddOrderClick = () => {
    navigate("/my-orders-page");
  };

  const handleMyOrdersClick = () => {
    navigate("/my-orders-page");
  };

  return {
    handleAddOrderClick,
    handleMyOrdersClick,
  };
};

export default useAddOrderPageVM;
