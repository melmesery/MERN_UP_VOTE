import { React, useState } from "react";
import { Button, Form, FormGroup, Input, Modal } from "reactstrap";
import edit from "../assets/images/edit.png";
import axios from "axios";
import { toast } from "react-toastify";

function EditPostModal({ id, userPost }) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    try {
      const response = await axios.patch(
        `http://localhost:5000/post/update/${id}`,
        formData,
        {
          headers: {
            authorization: `Believe__${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(response.data.message);
      toggle();
      userPost();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="rounded-0">
      <img src={edit} className="diff-img" onClick={toggle} />
      <Modal isOpen={modal} fade={false} toggle={toggle} className="rounded-0">
        <Form className="modal-form" onSubmit={handleSubmit}>
          <FormGroup>
            <Input
              id="exampleTitle"
              name="title"
              placeholder="Title"
              type="text"
              // defaultValue={title}
            />
          </FormGroup>
          <FormGroup>
            <Input
              id="exampleCaption"
              name="caption"
              placeholder="Caption"
              type="text"
              // defaultValue={caption}
            />
          </FormGroup>
          <FormGroup>
            <Input
              id="exampleImage"
              name="image"
              type="file"
              accept="image/*"
            />
          </FormGroup>
          <Button type="submit">Update</Button>
        </Form>
      </Modal>
    </div>
  );
}

export default EditPostModal;
