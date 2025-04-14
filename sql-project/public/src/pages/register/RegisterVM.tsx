import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useRegisterVM = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  // const handleRegister = (e: React.FormEvent) => {
  //   handleSubmit(e: React.FormEvent)
  //   navigate("/login");
  // };

    const [formData, setFormData] = useState({
      first_name: '',
      last_name: '',
      company_name: '',
      address:'',
      phone:'',
      email:'',
      password:'',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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
    handleBackClick,
    // handleRegister,
    formData, setFormData,
    handleChange, handleSubmit
  };
};

export default useRegisterVM;
