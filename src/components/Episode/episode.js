import React from "react";
import { Card } from "react-bootstrap";
import { withRouter } from "react-router-dom";

import "./style.css";
import { ReactComponent as RickMorty } from "../../img/rickandmorty.svg";

function Episode({ data, history }) {
  return (
    <Card
      className="m-2 d-flex flex-column epi-card"
      bg="light"
      onClick={() => history.push(`/episode/${data.name}`)}
    >
      <div className="d-flex flex-row justify-content-start p-2">
        <RickMorty className="m-1" style={{ height: "30px", width: "30px" }} />
        <h1 className="mb-0 p-2" style={{ fontSize: "18px" }}>
          {data.name}
        </h1>
      </div>
      <h2 className="m-1 mt-0 pl-5" style={{ fontSize: "16px" }}>
        Episode: {data.episode}
      </h2>
    </Card>
  );
}

export default withRouter(Episode);
