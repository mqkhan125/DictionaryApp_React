import React, { useState } from "react";

const WordSearch = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  const handleOnchangeEvent = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  };

  const fetchData = async () => {
    try {
      let get = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${search}`
      );
      let jsonData = await get.json();
      setData(jsonData[0])
      console.log(jsonData[0]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="app">
      <h1>Dictionary App</h1>
      <div className="container">
        <div className="searchBar">
          <input
            type="text"
            placeholder="Search Word's"
            value={search}
            onChange={handleOnchangeEvent}
          />
          <button onClick={fetchData}>Search</button>
        </div>
        <div className="datas">
          
        </div>
      </div>
    </div>
  );
};

export default WordSearch;
