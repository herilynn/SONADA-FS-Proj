import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getSearchedGroupData } from "../../store/search";

const SearchResults = () => {
  const dispatch = useDispatch();

  const searchedGroups = useSelector(getSearchedGroupData);

  const [displayGrps, setDisplayGrps] = useState(false);

  const toggleHeader = (header) => {
    setDisplayGrps(header === "groups");
  };
//   debugger;
//   if (!searchedGroups) return null; 

  return (
    <div className="search-results">
      <div id="search-heading">
        Groups
      </div>

        <div id="group-results">
          {searchedGroups && 
          searchedGroups.length > 0 &&
            searchedGroups.map((group) => (
              <div key={group.id} className="presentGroups">
                <h3>{group.name}</h3>
                <p>{group.description}</p>
              </div>
            ))}
            {
                (!searchedGroups || searchedGroups.length === 0) && <div> No group found </div>
            }
        </div>
    </div>
  );
};

export default SearchResults;
