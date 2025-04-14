import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface OrderFormData {
  order_id: string;
  client_id: string;
  order_date: string;
  delivery_date: string;
  praises: string;
  knives_id: string;
  sticker_finesh: string;
  sticker_id: string;
  arrival_date: string;
  sticker_quantity: string;
  knives_quantity: string;
  materials_type: string;
}

const useAddOrderVM = () => {
  const navigate = useNavigate();
  const [materials, setMaterials] = useState([]);
  const [selectedMaterialId, setSelectedMaterialId] = useState("");

  const [sticker_finish, set_sticker_finish] = useState([]);
  const [selected_sticker_finesh, set_selected_sticker_finesh] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/fetchMaterials"
        );
        if (!response.ok) throw new Error("Failed to fetch materials");

        const data = await response.json();
        setMaterials(data.result);
        console.log("Materials list:", data.result);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetch_sticker_finesh = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/fetch_sticker_finesh"
        );
        if (!response.ok) throw new Error("Failed to fetch materials");

        const data = await response.json();
        set_sticker_finish(data.result);
        console.log("sticker finesh list:", data.result);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetch_sticker_finesh(),fetchMaterials();
  }, []);

  const [formData, setFormData] = useState<OrderFormData>({
    order_id: "",
    client_id: "",
    order_date: "",
    delivery_date: "",
    praises: "",
    knives_id: "",
    sticker_finesh: "",
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

    console.log("Order added:", formData);

    navigate("/orders");
  };

  return {
    formData,
    handleInputChange,
    handleSubmit,
    handleBackClick,
    materials, setMaterials,
    selectedMaterialId, setSelectedMaterialId,
    sticker_finish, set_sticker_finish,
    selected_sticker_finesh, set_selected_sticker_finesh,
    date, setDate
  };
};

export default useAddOrderVM;
