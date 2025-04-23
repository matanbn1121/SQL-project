import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Client } from "../../model/userModel";

export function useRegisterVM() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleSubmit() {
    if (password !== confirmPassword) {
      alert("הסיסמאות לא תואמות");
      return;
    }
  
    const today = new Date().toISOString().split("T")[0]; 
    const newClient: Client = {
      client_name: `${firstName} ${lastName}`,
      client_email: email,
      client_password: password,
      client_entry_date: today as unknown as Date,
      client_phone: phone,
      client_address_id: 3,
      client_company_registration: today as unknown as Date
    };
  
    sendRegisterRequest(newClient);
  }

  async function sendRegisterRequest(client: Client) {
    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(client),
        credentials: "include"
      });
  
      const data = await response.json();
      console.log("נרשמת בהצלחה:", data); 
      window.location.href = "/login";  
    } catch (error) {
      console.error("שגיאה בשליחת הבקשה:", error); 
    }
  }

  return {
    firstName, setFirstName,
    lastName, setLastName,
    companyName, setCompanyName,
    address, setAddress,
    phone, setPhone,
    email, setEmail,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    handleSubmit,handleBackClick
  };
}
