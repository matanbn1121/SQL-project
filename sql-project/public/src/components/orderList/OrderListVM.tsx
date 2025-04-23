import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface OrderFormData {
  order_id: string;
  client_id: string;
  order_date: string;
  delivery_date: string;
  praises: string;
  sticker_quantity: string;
  materials_id: string; 
  knives_id?: string;
  engravings_id?: string;
  sticker_id?: string;
  arrival_date?: string;
  knives_quantity?: string;
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



  const deleteOrder = async (orderId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/main/deleteOrderByClient/${orderId}`, {
        method: "DELETE",
        credentials: 'include'
      });
      if (!response.ok) throw new Error("שגיאה במחיקת ההזמנה");
      setFormData((prev) => prev.filter(order => order.order_id !== orderId));
      console.log("Order deleted successfully");
    } catch (err) {
      console.error("Error deleting order:", err);
    }
  };


  const updateOrder = async (updatedOrder: OrderFormData) => {
    try {
      const response = await fetch(`http://localhost:3000/main/updateOrder/${updatedOrder.order_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updatedOrder),
      });
  
      if (!response.ok) throw new Error("שגיאה בעדכון ההזמנה");
  
      // עדכון רשימת ההזמנות בזיכרון (ב-View)
      setFormData((prev) =>
        prev.map((order) =>
          order.order_id === updatedOrder.order_id ? updatedOrder : order
        )
      );
    } catch (err) {
      console.error("שגיאה בעדכון:", err);
    }
  };



  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log("Order Submitted:", formData);
  //   // TODO: Add API request here or validation logic
  // };

  return {
    formData,
    //handleInputChange,
    // handleSubmit,
    handleBackClick,
      deleteOrder,
    updateOrder
    };
  };

export default useOrderListVM;
