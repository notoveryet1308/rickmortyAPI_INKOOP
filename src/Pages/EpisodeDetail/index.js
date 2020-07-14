import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useParams, withRouter } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/Loading";
import { getEpisodeByName } from "../../API";
import { ReactComponent as BackBtn } from "../../img/back-btn.svg";
import "./style.css";

function Index({ history, searchname }) {
  const [fetchdata, setFetchdata] = useState(true);
  const [epidata, setEpidata] = useState(null);
  const [characterimgs, setChardata] = useState(null);
  const { name } = useParams();
  const imgurl = [];
  useEffect(() => {
    getEpisodeByName(name).then(data => {
      setEpidata(data);
      setFetchdata(false);
    });
  }, [name]);

  useEffect(() => {
    if (epidata !== null) {
      let allapirequest = epidata[0].characters.map(api => axios.get(api));
      axios.all(allapirequest).then(responses => setChardata(responses));
    }
  }, [epidata, imgurl]);

  return (
    <Container>
      {fetchdata === true ? (
        <Loading />
      ) : (
        <div className="episode-full-detail">
          <div className="goback" onClick={() => history.goBack()}>
            <BackBtn />
          </div>
          <div className="text-info">
            <h1>{epidata[0].name}</h1>
            <p>
              Air Date:{" "}
              <span style={{ color: "black" }}>{epidata[0].air_date}</span>
            </p>
            <p>
              Episode:{" "}
              <span style={{ color: "black" }}>{epidata[0].episode}</span>
            </p>
          </div>
          <div className="character-img">
            <h1>Characters:</h1>
            <div className="images">
              {characterimgs !== null &&
                characterimgs.map((info, _index) => (
                  <div className="image">
                    <img src={info.data.image} alt={info.data.name} />
                    <p>{info.data.name}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}

export default withRouter(Index);
