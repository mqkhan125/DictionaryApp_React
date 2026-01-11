import React, { useState } from "react";

const WordSearch = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    if (!search.trim()) return;

    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${search}`
      );
      const json = await res.json();
      console.log(json)

      if (!res.ok) {
        throw new Error(json.message || "Word not found");
      }

      setData(json[0]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Dictionary App</h1>

      <div className="container">
        <div className="searchBar">
          <input
            type="text"
            placeholder="Search a word"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchData()}
          />
          <button onClick={fetchData}>Search</button>
        </div>

        <div className="datas">
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {data && (
            <>
              <h2>Word: {data.word}</h2>

              {/* phonetics */}
              {data.phonetics?.[0]?.text && (
                <p>Phonetic: {data.phonetics[0].text}</p>
              )}

              {/* meanings */}
              {data.meanings.map((meaning, index) => (
                <div key={index}>
                  <p>
                    <strong>Part of Speech:</strong> {meaning.partOfSpeech}
                  </p>

                  {meaning.definitions.map((def, i) => (
                    <p key={i}>• {def.definition}</p>
                  ))}

                  {meaning.synonyms?.length > 0 && (
                    <p>
                      <strong>Synonyms: </strong>
                      {meaning.synonyms.slice(0, 5).join(", ")}
                    </p>
                  )}
                </div>
              ))}

              {data.sourceUrls?.[0] && (
                <button
                  onClick={() => window.open(data.sourceUrls[0], "_blank")}
                >
                  Read More
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WordSearch;
