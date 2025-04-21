import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useWelcomePageVM = () => {
   const [clientId, setClientId] = useState([]);

   useEffect(() => {
    const fetchClientId = async () => {
      try{
        const response = await fetch(
            "http://localhost:3000/main/fetchClientId",{
               credentials: 'include'
            }
        );
        if (!response.ok) throw new Error("Failed to fetch clientId");

        const data = await response.json();
        setClientId(data.result)

      }
      catch (error){
        console.error("error fetching clientId", error);
      }
    };

  fetchClientId();
  }, []);
  const navigate = useNavigate();

  const handleAddOrderClick = () => {
    navigate("add-order");
  };

  const handleMyOrdersClick = () => {
    navigate("my-orders");
  };

  const handelAllOrdersClick = () => {
    navigate("all-orders");
  }

  return {
    handleAddOrderClick,
    handleMyOrdersClick,
    handelAllOrdersClick,
    clientId
  };
};

export default useWelcomePageVM;
