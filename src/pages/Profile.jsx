import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import ProfileUI from "../UI/ProfileUI.jsx";

const Profile = () => {
  const [data, setData] = useState([]);

  const userData = () => {
    axios
      .get("http://localhost:5000/user", {
        headers: { authorization: `Believe__${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setData(response.data.User);
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  useEffect(() => {
    userData();
  }, []);

  return (
    <div>
      <Header />
      <ProfileUI data={data} userData={userData} />
      <Footer />
    </div>
  );
};

export default Profile;
