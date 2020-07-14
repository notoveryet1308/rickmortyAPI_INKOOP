import React from "react";
import { Spinner } from "react-bootstrap";

import "./style.css";

function index({ variant }) {
  return (
    <div className="loading">
      <Spinner animation="grow" variant={variant} />
    </div>
  );
}

export default index;
