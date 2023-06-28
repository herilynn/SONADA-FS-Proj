import React, { useState } from 'react'
import './SearchBar.css';
import { IoMdSearch } from 'react-icons/io'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { searchGroups } from '../../store/search';

const SearchBar = () => {

    const [search, setSearch] = useState("");

    const history = useHistory();

    const dispatch = useDispatch();

    const changeQuery = (e) => {
        setSearch(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(searchGroups ({
          query: search
        }));
        history.replace("/searchresults");
        };
    
  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      {/* <p className='search-img'><IoMdSearch color="#fff" /> </p> */}
        <input type="text" className="search-bar" value={search} placeholder="Search for groups and events" onChange={changeQuery} />
        <button className="search-button" onClick={handleSubmit}><IoMdSearch color="#fff" /></button>

    </form>
  )
}

export default SearchBar