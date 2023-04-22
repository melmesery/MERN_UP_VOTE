import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/LoginForm.css";
import LoginUI from "../UI/LoginUI.jsx";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Data Required");
      return;
    } else {
      fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === "Done") {
            localStorage.setItem("token", `${data.token}`);
            // toast.success(`Welcome Back`);
            setTimeout(() => navigate("/home"), 500);
          } else {
            toast.error(data.message);
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };
  return (
    <div>
      <LoginUI
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default LoginForm;
