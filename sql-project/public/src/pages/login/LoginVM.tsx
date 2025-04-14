import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useLoginVM = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login submitted:', { email, password });

    fetch('http://localhost:3000/api/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        
        body: JSON.stringify({ email, password }),
    })
    .then(async (response) => {
        const data = await response.json();

        if (response.status === 200) {
            console.log('Login successful:', data);
            alert('Login successful');
            navigate('/mainPage');
       
        } else {
            console.error('Login failed:', data);
            alert(data.message || 'Login failed');
        }
    })
    .catch((error) => {
        console.error('Error during login:', error);
        alert('Network error during login');
    });
};

  const handleBackClick = () => {
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/mainPage");
  };

  return {
    handleBackClick,
    handleLogin,
    email, setEmail,
    password, setPassword,
    handleSubmit
  };
};

export default useLoginVM;
