import { React, useState } from "react";
import { toast } from "react-toastify";
import { Button, Form, FormGroup, Input, Modal } from "reactstrap";
import { BsPlusSquareDotted } from "react-icons/bs";

function ModalExample({ loadData }) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("caption", caption);
    formData.append("image", image);
    fetch("https://up-vote-api.vercel.app/post", {
      method: "POST",
      headers: {
        authorization: `Believe__${localStorage.getItem("token")}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        toast.success("Post Added Sucessfully");
        setModal(false);
        loadData();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    setImage(file);
  }

  return (
    <div className="container rounded-0">
      <Button onClick={toggle} className="modal-button">
        <BsPlusSquareDotted title="Add Post" />
      </Button>
      <Modal isOpen={modal} fade={false} toggle={toggle} className="rounded-0">
        <Form className="modal-form" onSubmit={handleSubmit}>
          <FormGroup>
            <Input
              id="exampleTitle"
              name="title"
              placeholder="Title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              defaultValue=""
            />
          </FormGroup>
          <FormGroup>
            <Input
              id="exampleCaption"
              name="caption"
              placeholder="Caption"
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              defaultValue=""
            />
          </FormGroup>
          <FormGroup>
            <Input
              id="exampleImage"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              defaultValue=""
            />
          </FormGroup>
          <Button type="submit">POST</Button>
        </Form>
      </Modal>
    </div>
  );
}

export default ModalExample;
