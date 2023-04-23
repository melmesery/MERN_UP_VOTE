import axios from "axios";
import React, { useEffect, useState } from "react";
import { CgMenuGridO } from "react-icons/cg";
import { IoHome } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import "../styles/Header.css";
import ModalExample from "./Modal.jsx";

const Header = ({ loadData }) => {
  const handleLogout = async () => {
    try {
      const response = await fetch("https://up-vote-api.vercel.app/auth/logout", {
        method: "PATCH",
        headers: {
          authorization: `Believe__${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        localStorage.removeItem("token");
        window.location.href = "/";
      } else {
        toast.error("Unable to log out");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("https://up-vote-api.vercel.app/user", {
        headers: { authorization: `Believe__${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setData(response.data.User);
      })
      .catch((error) => {
        toast.error(error);
      });
  }, []);

  return (
    <header className="shadow fixed-top">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between">
          <div className="w-25">
            <h4>Influence</h4>
          </div>
          <div>
            <ModalExample loadData={loadData} />
          </div>
          <div className="d-flex w-25 mx-end align-items-center justify-content-end gap-4">
            <NavLink to="/home" className="fs-3">
              <IoHome />
            </NavLink>
            <NavLink to="/profile">
              <img
                src={`https://up-vote-api.vercel.app/${data.profilePic}`}
                alt="API Image"
                className="header-profile"
              />
            </NavLink>
            <UncontrolledDropdown group>
              <DropdownToggle className="fs-3 w-100 mx-auto">
                <CgMenuGridO />
              </DropdownToggle>

              <DropdownMenu className="rounded-0">
                <DropdownItem>
                  <NavLink to="/profile" className="text-black">
                    Profile
                  </NavLink>
                </DropdownItem>
                <DropdownItem>Settings</DropdownItem>
                <DropdownItem onClick={handleLogout}>Log Out</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
