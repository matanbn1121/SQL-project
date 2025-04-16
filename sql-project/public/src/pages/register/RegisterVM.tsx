import { useState } from "react";
import { Client } from "../../model/userModel";

export function useRegisterVM() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
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
      client_address_id: 1,
      client_company_registration: today as unknown as Date
    };
  
    sendRegisterRequest(newClient);
  }
  
  async function sendRegisterRequest(client: Client) {
    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(client)
      });

      const data = await response.json();
      console.log("נרשמת בהצלחה:", data);
      alert("ההרשמה הצליחה!");
      window.location.href = "/login"; 
    } catch (error) {
      console.error("שגיאה בשליחת הבקשה:", error);
      alert("שגיאה בשליחה");
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registering client:', formData);

    fetch('http://localhost:3000/api/register', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
        .then(async (response) => {
            const data = await response.json();

            if (!response.ok) {
                // הצגת שגיאה מהשרת ב-alert
                alert(data.message || 'Registration failed');
                throw new Error(data.message || 'Registration failed');
            }

            // הצלחה - הצגת הודעה ומעבר לעמוד login
            alert('Registration successful');
            navigate('/login');
        })
        .catch((error) => {
            console.error('Error during registration:', error);
            // כבר הצגנו alert בשלב קודם אם זה מהשרת, אז כאן זה ליתר ביטחון
            alert('Something went wrong during registration.');
        });
};


  return {
    firstName, setFirstName,
    lastName, setLastName,
    companyName, setCompanyName,
    phone, setPhone,
    email, setEmail,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    handleSubmit
  };
}
