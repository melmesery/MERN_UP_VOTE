import React from "react";
import { Link } from "react-router-dom";
import { Form, Button, FormGroup, Input } from "reactstrap";
import login from "../assets/images/login.png";

const SignUpUI = ({
  userName,
  email,
  password,
  cPassword,
  age,
  setuserName,
  setEmail,
  setPassword,
  setCPassword,
  setAge,
  handleSubmit,
}) => {
  return (
    <div>
      <div className="signupForm">
        <Form className="Sform" onSubmit={handleSubmit}>
          <img src={login} />
          <FormGroup>
            <Input
              id="exampleUsername"
              name="username"
              placeholder="Username"
              type="text"
              value={userName}
              onChange={(e) => setuserName(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Input
              id="examplAge"
              name="age"
              placeholder="Age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Input
              id="exampleEmail"
              name="email"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Input
              id="examplePassword"
              name="password"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Input
              id="exampleCPassword"
              name="cPassword"
              placeholder="Confirm Password"
              type="password"
              value={cPassword}
              onChange={(e) => setCPassword(e.target.value)}
            />
          </FormGroup>
          <Button type="submit">SIGN UP</Button>
          <div className="d-flex gap-3 align-items-center justify-content-center mt-4">
            <p className="mb-0"> Already Have Account ?</p>
            <Link to="/" className="nav-link text-danger">
              LOGIN
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignUpUI;
