import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Client } from "../../model/userModel";

export function useRegisterVM() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
      client_company_registration: today as unknown as Date,
    };

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newClient)
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "ההרשמה נכשלה");
        throw new Error(data.message || "Registration failed");
      }

      alert("נרשמת בהצלחה!");
      navigate("/login");
    } catch (error) {
      console.error("שגיאה בשליחת הבקשה:", error);
      alert("משהו השתבש בהרשמה.");
    }
  };

  function handleBackClick() {
    navigate("/");
  }


  return {
    firstName, setFirstName,
    lastName, setLastName,
    companyName, setCompanyName,
    phone, setPhone,
    email, setEmail,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    handleSubmit,handleBackClick
  };
}
