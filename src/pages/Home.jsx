import { React, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import "../styles/Home.css";
import Post from "../UI/Post.jsx";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const loadData = () => {
    fetch("http://localhost:5000/post", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.PostList);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="home">
      <Header loadData={loadData} />
      <Post posts={posts} loadData={loadData} />
      <Footer />
    </div>
  );
};

export default Home;
