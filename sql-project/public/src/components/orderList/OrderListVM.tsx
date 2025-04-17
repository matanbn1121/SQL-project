import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface Order {
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
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/orders");
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setOrders(data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return {
    orders,
    loading,
    error,
  };
};

export default useOrderListVM;
