import { React, useState } from "react";
import { Button, Form, FormGroup, Input, Modal } from "reactstrap";
import axios from "axios";
import { toast } from "react-toastify";

const EditUserModal = ({ userData, data }) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    try {
      const response = await axios.patch(
        `http://localhost:5000/user/profile`,
        formData,
        {
          headers: {
            authorization: `Believe__${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(response.data.message);
      toggle();
      userData();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="rounded-0">
      <button className="edit-btn" onClick={toggle}>
        Edit
      </button>
      <Modal isOpen={modal} fade={false} toggle={toggle} className="rounded-0">
        <Form className="modal-form" onSubmit={handleSubmit}>
          <FormGroup>
            <Input
              id="exampleBio"
              name="bio"
              placeholder="Bio"
              type="text"
              defaultValue={data.bio}
            />
          </FormGroup>
          <FormGroup>
            <Input
              id="exampleAddress"
              name="address"
              placeholder="Address"
              type="text"
              defaultValue={data.address}
            />
          </FormGroup>
          <FormGroup>
            <Input
              id="exampleEducation"
              name="education"
              placeholder="Education"
              type="text"
              defaultValue={data.education}
            />
          </FormGroup>
          <FormGroup>
            <Input
              id="examplePhone"
              name="phone"
              placeholder="Phone"
              type="text"
              defaultValue={data.phone}
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
};

export default EditUserModal;
