import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import Loading from "../Loading";
import { ReactComponent as Back } from "../../img/back-btn.svg";
import { getEpisodeByName } from "../../API";
import "./style.css";

function Index({ episodename, isSearching }) {
  const [episode, setEpisode] = useState("");
  const [loading, setLoading] = useState(true);
  const [chardata, setChardata] = useState(null);

  useEffect(() => {
    getEpisodeByName(episodename).then(data => {
      setEpisode(data);
      setLoading(false);
    });
  }, [episodename]);

  useEffect(() => {
    if (episode[0]) {
      console.log(episode[0].characters);
      let allapirequest = episode[0].characters.map(api => axios.get(api));
      axios.all(allapirequest).then(responses => setChardata(responses));
    }
  }, [episode]);
  return (
    <>
      {episodename && (
        <Container className="search-container">
          <div className="closebtn" onClick={() => isSearching(false)}>
            <Back />
          </div>
          {loading === true ? (
            <Loading variant="primary" />
          ) : (
            <div className="infos">
              <div className="episode">
                <h1>{episode[0].name}</h1>
                <p>{episode[0].episode}</p>
                <p>{episode[0].air_date}</p>
              </div>
              <div className="character-img-search">
                <h1>Characters:</h1>
                <div className="images-search">
                  {chardata !== null &&
                    chardata.map((info, _index) => (
                      <div className="image-search">
                        <img src={info.data.image} alt={info.data.name} />
                        {/* <p>{info.data.name}</p> */}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </Container>
      )}
    </>
  );
}

export default Index;
