import { useNavigate } from "react-router-dom";

function useLoginVM() {
  const navigate = useNavigate();

  function handleBackClick() {
    navigate("/");
  }

  async function handleLogin(email: string, password: string) {
    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", 
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("התחברת בהצלחה:", data);
        navigate("/main");
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
  };
}

export default useLoginVM;
