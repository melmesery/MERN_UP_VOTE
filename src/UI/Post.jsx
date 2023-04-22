import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import love from "../assets/images/love.png";
import dislike from "../assets/images/dislike.png";
import CommentModal from "../components/CommentModal.jsx";

const Post = ({ posts, loadData }) => {
  const [like, setLike] = useState([]);
  const [disLike, setDisLike] = useState([]);

  const likePost = (id) => {
    axios
      .patch(
        `http://localhost:5000/post/${id}/like`,
        { like },
        {
          headers: {
            authorization: `Believe__${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        setLike(response.data.Post);
        loadData();
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const disLikePost = (id) => {
    axios
      .patch(
        `http://localhost:5000/post/${id}/dislike`,
        { disLike },
        {
          headers: {
            authorization: `Believe__${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        setDisLike(response.data.Post);
        loadData();
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <div className="posting">
      <h3 className="text-center mb-5">
        <mark className="px-5 rounded-5">
          Share Your Experience With{" "}
          <span className="text-danger fw-bold">Influence</span>
        </mark>
      </h3>
      {posts.map((post) => {
        return (
          <section className="post" key={post.Post._id}>
            <div className="container">
              <div className="row d-flex gap-5 justify-content-center">
                <div className="col-sm-12 col-md-7 left">
                  <div className="post-image-con">
                    <img
                      src={`http://localhost:5000/${post.Post.image}`}
                      className="post-image rounded-0"
                    />
                  </div>
                  <div className="title-caption mt-4 border-light border-bottom">
                    <div className="border-light">
                      <h4 className="fw-bold text-success mb-3">
                        {post.Post.title}
                      </h4>
                      <p className="mb-0">{post.Post.caption}</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 col-md-4 right">
                  <div className="d-flex gap-3 align-items-center border-light border-bottom">
                    <img
                      src={`http://localhost:5000/${post.Post.userId.profilePic}`}
                      alt="API Image"
                      className="small-profile"
                    />
                    <div>
                      <h5 className="fw-bold text-danger">
                        {post.Post.userId.userName}
                      </h5>
                      <p className="fs-6">
                        {new Date(post.Post.createdAt).toDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="icons border-bottom border-light">
                    <div className="d-flex gap-2">
                      <img
                        src={love}
                        className="post-icon"
                        onClick={() => {
                          likePost(post.Post._id);
                        }}
                      />
                      <p className="mb-0">{post.Post.like.length}</p>
                    </div>
                    <div className="d-flex gap-2">
                      <img
                        src={dislike}
                        className="post-icon"
                        onClick={() => {
                          disLikePost(post.Post._id);
                        }}
                      />
                      <p className="mb-0">{post.Post.dislike.length}</p>
                    </div>
                    <div>
                      <CommentModal id={post.Post._id} loadData={loadData} />
                    </div>
                  </div>
                  {post.Comment.map((comment) => {
                    return (
                      <div className="bg-white px-4 py-2 mb-3 rounded-5">
                        <div className="d-flex gap-2">
                          <img
                            src={`http://localhost:5000/${comment.userId.profilePic}`}
                            className="comment-profile"
                          />
                          <h6 className="text-primary fw-bold">
                            {comment.userId.userName}
                          </h6>
                        </div>

                        <p className="m-0  ps-4">{comment.text}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default Post;
