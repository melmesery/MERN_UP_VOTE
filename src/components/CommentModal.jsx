import axios from "axios";
import { React, useState } from "react";
import { toast } from "react-toastify";
import { Button, Form, FormGroup, Input, Modal } from "reactstrap";
import sad from "../assets/images/sad.png";

function CommentModal({ id, loadData }) {
  const [modal, setModal] = useState(false);
  const [text, setText] = useState("");

  const toggle = () => setModal(!modal);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        `http://localhost:5000/post/${id}/comment`,
        { text },
        {
          headers: {
            authorization: `Believe__${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        toggle();
        loadData();
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="rounded-0">
      <Button onClick={toggle} className="comment-modal-button">
        <img src={sad} className="post-icon" alt="Sad Icon" />
      </Button>
      <Modal isOpen={modal} fade={false} toggle={toggle} className="rounded-0">
        <Form className="modal-form" onSubmit={handleSubmit}>
          <FormGroup>
            <Input
              id="exampleText"
              name="text"
              type="text"
              value={text}
              onChange={handleInputChange}
            />
          </FormGroup>
          <Button type="submit">Comment</Button>
        </Form>
      </Modal>
    </div>
  );
}

export default CommentModal;
