import { useState } from "react";
import { useNavigate } from "react-router-dom";

function useLoginVM() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleBackClick() {
    navigate("/");
  }

  async function handleLogin(email: string, password: string) {
    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", 
        body: JSON.stringify({   client_email: email,
          client_password: password }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("התחברת בהצלחה:", data);
        window.location.href = "/mainPage"; 
      } else {
        alert(data.message || "אימייל או סיסמה שגויים");
      }
    } catch (error) {
      console.error("שגיאת התחברות:", error);
      alert("שגיאה בחיבור לשרת");
    }
  }

  return {
    handleBackClick,
    handleLogin,
    email, setEmail,
    password, setPassword,
    handleSubmit
  };
}

export default useLoginVM;
