import { useState } from "react";
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

  const [formData, setFormData] = useState<OrderFormData>({
    order_id: "",
    client_id: "",
    order_date: "",
    delivery_date: "",
    praises: "",
    knives_id: "",
    engravings_id: "",
    sticker_id: "",
    arrival_date: "",
    sticker_quantity: "",
    knives_quantity: "",
    materials_type: "",
  });

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Order Submitted:", formData);
    // TODO: Add API request here or validation logic
  };

  return {
    formData,
    handleInputChange,
    handleSubmit,
    handleBackClick,
  };
};

export default useOrderListVM;
