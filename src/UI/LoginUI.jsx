import React from "react";
import { Link } from "react-router-dom";
import { Form, Button, FormGroup, Input } from "reactstrap";
import login from "../assets/images/login.png";

const LoginUI = ({ email, password, setEmail, setPassword, handleSubmit }) => {
  return (
    <div className="loginForm">
      <Form className="Lform" onSubmit={handleSubmit}>
        <img src={login} />
        <FormGroup>
          <Input
            id="exampleEmail"
            name="email"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Input
            id="examplePassword"
            name="password"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </FormGroup>
        <Button type="submit">LOGIN</Button>
        <div className="d-flex gap-3 align-items-center justify-content-center mt-4">
            <p className="mb-0"> Create New Account ?</p>
            <Link to="/signup" className="nav-link text-danger">
              Sign Up
            </Link>
          </div>
      </Form>
    </div>
  );
};

export default LoginUI;
