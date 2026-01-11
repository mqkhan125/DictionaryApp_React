import React from 'react'

const WordSearch = () => {
  return (
    <div className='app'>
        <h1>Dictionary App</h1>
        <div className='container'>
            <div className='searchBar'>
                <input type="text" placeholder="Search Word's" />
                <button>Search</button>
            </div>
            <div className="datas">

            </div>
        </div>

    </div>
  )
}

export default WordSearch;