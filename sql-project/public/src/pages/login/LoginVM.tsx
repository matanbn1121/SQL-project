import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/context/AuthContext";

function useLoginVM() {
  const navigate = useNavigate();
  const { setIsRegistered } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleBackClick() {
    navigate("/");
  }

  async function handleLogin() {
    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          client_email: email,
          client_password: password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setIsRegistered(true);
        alert("Login successful");
        window.location.href = "/mainPage";
      } else {
        alert(data.message || "אימייל או סיסמה שגויים");
      }
    } catch (error) {
      console.error("שגיאת התחברות:", error);
      alert("שגיאה בחיבור לשרת");
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    handleLogin();
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
    handleBackClick,
    handleLogin,
  };
}

export default useLoginVM;