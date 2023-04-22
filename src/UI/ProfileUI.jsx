import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "../styles/Profile.css";
import diff from "../assets/images/up-and-down-arrow.png";
import del from "../assets/images/delete.png";
import EditPostModal from "../components/EditPostModal.jsx";
import EditUserModal from "../components/EditUserModal.jsx";

const ProfileUI = ({ data, userData }) => {
  const [posts, setPosts] = useState([]);

  const userPost = () => {
    axios
      .get("http://localhost:5000/post/user", {
        headers: { authorization: `Believe__${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setPosts(response.data.Posts);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  useEffect(() => {
    userPost();
  }, []);

  const deleteBlog = async (id) => {
    try {
      if (window.confirm("You Are About To Delete A Post")) {
        const response = await axios.delete(
          `http://localhost:5000/post/${id}`,
          {
            headers: {
              authorization: `Believe__${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.message == "Not Authenticated") {
          toast.error(response.data.message);
        } else {
          toast.success(response.data.message);
          userPost();
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="py-5">
      <section className="profile shadow">
        <div className="container-fluid">
          <div className="image-container">
            <img
              src={`http://localhost:5000/${data.profilePic}`}
              alt="API Image"
            />
          </div>
          <h1 className="text-center text-danger mt-3 fw-bold">
            {data.userName}
          </h1>
          <p className="w-75 mx-auto text-center mb-5">{data.bio}</p>
        </div>
      </section>
      <section className="about">
        <div className="about-div bg-light p-5 rounded-4">
          <h3 className="mb-3 fw-bold">About</h3>
          <div className="d-flex gap-2">
            <h6 className="fw-bold">Address:</h6>
            <p>{data.address}</p>
          </div>

          <div className="d-flex gap-2">
            <h6 className="fw-bold">Email:</h6>
            <p>{data.email}</p>
          </div>
          <div className="d-flex gap-2">
            <h6 className="fw-bold">Phone:</h6>
            <p>{data.phone}</p>
          </div>
          <div className="d-flex gap-2">
            <h6 className="fw-bold">Education:</h6>
            <p>{data.education}</p>
          </div>
          <EditUserModal userData={userData} data={data} />
        </div>
      </section>
      <div className="container">
        <div className="row">
          <h4 className="text-center fw-bold py-5 fs-1 border bg-light rounded-4 my-5 w-50 mx-auto">
            Posts <span className="post-no">{posts.length}</span>
          </h4>
          {posts.map((post) => {
            return (
              <div className="col-md-12" key={post._id}>
                <div className="row mt-5 g-0">
                  <div className="col-md-8">
                    <section className="profile-projects">
                      <div className="project-container">
                        <img
                          src={`http://localhost:5000/${post.image}`}
                          className="proj shadow"
                        />
                      </div>
                    </section>
                  </div>
                  <div className="col-md-3 profile-right">
                    <p className="fs-6">
                      {new Date(post.createdAt).toDateString()}
                    </p>
                    <h3 className="fw-bold">{post.title}</h3>
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex gap-2 align-items-center">
                        <p>{post.like.length}</p>
                        <img src={diff} className="diff-img" />
                      </div>
                      <div className="d-flex gap-2 align-items-center">
                        <img
                          src={del}
                          className="diff-img"
                          onClick={() => deleteBlog(post._id)}
                        />
                        <EditPostModal id={post._id} userPost={userPost} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProfileUI;
