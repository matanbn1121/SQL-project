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
  const [clientId, setClientId] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [selectedMaterialId, setSelectedMaterialId] = useState("");

  const [sticker_finish, set_sticker_finish] = useState([]);
  const [selected_sticker_finesh, set_selected_sticker_finesh] = useState("");
  const [date, setDate] = useState("");


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
    }
    const fetchMaterials = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/main/fetchMaterials"
        );
        if (!response.ok) throw new Error("Failed to fetch materials");

        const data = await response.json();
        setMaterials(data.result);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetch_sticker_finesh = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/main/fetch_sticker_finesh"
        );
        if (!response.ok) throw new Error("Failed to fetch materials");

        const data = await response.json();
        set_sticker_finish(data.result);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetch_sticker_finesh(),fetchMaterials(),fetchClientId();
  }, []);

  async function set_new_order (){
  try {
    console.log("send order clicked:")
    console.log(date)
    console.log(formData.knives_id)
    console.log(formData.sticker_quantity)
    console.log(selected_sticker_finesh)
    console.log(selectedMaterialId)
    console.log(formData.praises)

    const delivery_date = date;
    const stickerDimensions = formData.knives_id;
    const sticker_quantity = formData.sticker_quantity;
    const stickerFinesh = selected_sticker_finesh;
    const materials_id = selectedMaterialId;
    const praises = formData.praises;
    const client_id = clientId?.[0]?.client_id || "some user";


    // order_date,
    // delivery_date,
    // praises,
    // sticker_quantity,
    // client_id,
    // materials_id,

      const order_date = new Date().toISOString().split("T")[0];
      const response = await fetch("http://localhost:3000/main/send_new_order", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({order_date,delivery_date,praises,sticker_quantity,client_id,materials_id})
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "הוספת הזמנה נכשלה!");
        throw new Error(data.message || "create new order failed");
      }

      alert("הוספת הזמנה עברה בהצלחה");
    } catch (error) {
      console.error("שגיאה ביצירת הזמנה", error);
      alert("הופסת הזמנה נכשלה!");
    }
    
  }

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
    set_new_order();

    console.log("Order added:", formData);

    // navigate("/orders");
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
    date, setDate,
    clientId
  };
};

export default useAddOrderVM;
