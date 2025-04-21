import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface OrderFormData {
  order_id: string;
  client_id: string;
  order_date: string;
  delivery_date: string;
  praises: string;
  knives_id: string;
  engravings_id: string;
  sticker_id: string;
  arrival_date: string;
  sticker_quantity: string;
  knives_quantity: string;
  materials_type: string;
}

const useOrderListVM = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<OrderFormData[]>([]);


  const handleBackClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:3000/main/fetchOrdersByClient",{
          credentials: 'include'
        });
        if (!response.ok) throw new Error("בעיה בטעינת ההזמנות");
        const data = await response.json();
        console.log(data.result)
        setFormData(data.result);
        // setOrders(data.result);
      } catch (err: any) {
        // setError(err.message || "שגיאה לא צפויה");
      } finally {
        // setLoading(false);
      }
    };


    fetchOrders();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log("Order Submitted:", formData);
  //   // TODO: Add API request here or validation logic
  // };

  return {
    formData,
    handleInputChange,
    // handleSubmit,
    handleBackClick };
};

export default useOrderListVM;
