import React, { useState, useEffect } from "react";

import { Button } from "react-bootstrap";
import "./style.css";
import { ReactComponent as Logo } from "../../img/rickandmorty.svg";
import { ReactComponent as Search } from "../../img/search.svg";
import { getEpisode } from "../../API";
function Index({ getEpisodeName, isSearching }) {
  const [inputvalue, setInputValue] = useState("");
  const [allEpisodename, setAllEpisodename] = useState([]);
  const [fetchingname, setFetchingname] = useState(true);
  useEffect(() => {
    getEpisode().then(data => {
      setAllEpisodename(data.results);
      setFetchingname(false);
    });
  }, []);
  const onChangeHandler = e => {
    getEpisodeName(e.target.value);
    setInputValue(e.target.value);
  };

  return (
    <header style={{ padding: "2rem" }}>
      <div className="d-flex flex-row justify-content-between">
        <Logo />
        <div className="d-flex flex-row justify-content-start align-items-center input-box">
          <input
            type="text"
            name="search"
            id="search"
            list="episodenames"
            value={inputvalue}
            placeholder="Search by episode name"
            onChange={onChangeHandler}
          />
          <datalist id="episodenames">
            {!fetchingname &&
              allEpisodename.map(data => <option value={data.name} />)}
          </datalist>
          <Button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              isSearching(true);
              setInputValue("");
            }}
          >
            <Search style={{ height: "25px", width: "25px" }} />
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Index;
