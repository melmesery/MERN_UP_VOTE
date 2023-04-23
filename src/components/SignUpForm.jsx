import axios from "axios";
import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/SignUpForm.css";
import SignUpUI from "../UI/SignUpUI.jsx";

const SignUpForm = () => {
  const [userName, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [age, setAge] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !cPassword || !age || !userName) {
      toast.error("Data Required");
      return;
    }
    if (password !== cPassword) {
      toast.error("Passwords Not Match!");
      return;
    }
    await axios
      .post("https://up-vote-api.vercel.app/auth/signup", {
        email,
        password,
        age,
        cPassword,
        userName,
      })
      .then((response) => {
        if (response.data.error) {
          toast.error(response.data.error._message);
        } else {
          toast.success("Check your Email");
          setTimeout(() => navigate("/"), 500);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <div>
      <SignUpUI
        userName={userName}
        email={email}
        password={password}
        cPassword={cPassword}
        age={age}
        setuserName={setuserName}
        setEmail={setEmail}
        setPassword={setPassword}
        setCPassword={setCPassword}
        setAge={setAge}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default SignUpForm;
