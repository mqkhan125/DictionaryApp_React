import React, { useState } from "react";

const WordSearch = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(null);

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
          {data ? (
            <div className="datas">
              <h2>Word : {data.word}</h2>
              <p>Part Of Speech : {data.meanings[0].partOfSpeech}</p>
              <p>definition : {data.meanings[0].definitions[0].definition}</p>
              <p>synonym : {data.meanings[0].synonyms[0]}</p>
              <button onClick={() => {window.open(data.sourceUrls[0], "_blank");}}>Read More</button>
            </div>
          ) : (
            "Data not found"
          )}
        </div>
      </div>
    </div>
  );
};

export default WordSearch;
