import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Route } from "react-router-dom";
import Header from "./components/header";
import Episodes from "./components/Episode";
import Loading from "./components/Loading";
import Pagination from "./components/Pagination";
import Search from "./components/Search";
import EpisodeDetail from "./Pages/EpisodeDetail";

import { getEpisode } from "./API";
import "./styles.css";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [searchEpisodeName, setSearchEpisodeName] = useState(null);
  const [page, setPage] = useState(1);
  const [episodes, setEpisodes] = useState(null);

  useEffect(() => {
    if (loading) {
      getEpisode(page).then(data => {
        setEpisodes(data.results);
        setLoading(false);
      });
    }
  }, [page, loading]);

  const paginate = currentpage => {
    setPage(currentpage);
    setLoading(true);
  };

  const getEpisodeName = name => {
    setSearchEpisodeName(name);
  };
  const isSearching = value => {
    setSearching(value);
  };

  return (
    <Container className="d-flex flex-column" style={{ background: "white" }}>
      <Route exact path="/">
        <Header getEpisodeName={getEpisodeName} isSearching={isSearching} />
        <div className="d-flex justify-content-center align-items-center">
          <h1 style={{ fontSize: "5vw" }}>The Rick And Morty</h1>
        </div>
        {loading && <Loading />}
        <div
          className="d-flex flex-wrap justify-content-center align-items-center"
          style={{ width: "90%", margin: "0 auto", paddingTop: "3rem" }}
        >
          {!loading &&
            episodes.map(data => <Episodes key={data.id} data={data} />)}
        </div>
        {!searching && !loading && (
          <Pagination page={page} paginate={paginate} />
        )}
        {searching === true && (
          <Search episodename={searchEpisodeName} isSearching={isSearching} />
        )}
      </Route>
      <Route exact path="/episode/:name" component={EpisodeDetail} />
    </Container>
  );
}
