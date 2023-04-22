import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="py-5 text-center bg-light">
      <h4>Influence</h4>
      <ul className="d-flex gap-3 list-unstyled justify-content-center">
        <li>
          <Link className="nav-link">About</Link>
        </li>
        <li>
          <Link className="nav-link">Blog</Link>
        </li>
        <li>
          <Link className="nav-link">Jobs</Link>
        </li>
        <li>
          <Link className="nav-link">API</Link>
        </li>
        <li>
          <Link className="nav-link">Privacy</Link>
        </li>
        <li>
          <Link className="nav-link">Terms</Link>
        </li>
        <li>
          <Link className="nav-link">Locations</Link>
        </li>
        <li>
          <Link className="nav-link">Influence Lite</Link>
        </li>
        <li>
          <Link className="nav-link">Help</Link>
        </li>
      </ul>
      <p>
        All Right Reserved &copy; <span>Influence</span>
      </p>
    </footer>
  );
};

export default Footer;
