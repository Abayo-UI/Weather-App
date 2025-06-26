import React from 'react'

const Search = ({setSearch, search, handleSearch}) => {
  return (
    <div className="d-flex justify-content-between mb-2" >
        <input
        type="text"
        placeholder="Ente City name"
        value={search}
        onChange={ (e) => setSearch(e.target.value)}
        name="search"
        className=" me-2 py-1 ps-1 search-bar"
        />
  
       <button className="btn btn-dark" onClick={handleSearch}> Search </button>
    </div>
  )
}

export default Search