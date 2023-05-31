import React, { useState } from 'react'
import './SearchBar.css';
import { IoMdSearch } from 'react-icons/io'
import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

const SearchBar = () => {

    const [search, setSearch] = useState("");

    // const navigate = useNavigate();

    const dispatch = useDispatch();

    const changeQuery = (e) => {
        setSearch(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Search query:', search);
        setSearch('');
        };
    
  return (
    <form className="search-bar" onSubmit={handleSubmit}>
        <input type="text" className="search-bar" value={search} placeholder="Search for groups and events" onChange={changeQuery} />
        <button className="search-button" onClick={handleSubmit}><IoMdSearch color="#fff" /></button>
    </form>
  )
}

export default SearchBar