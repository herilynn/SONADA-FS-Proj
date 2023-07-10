import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getSearchedGroupData } from "../../store/search";
import Footer from "../Footer/footer";

const SearchResults = () => {
  const dispatch = useDispatch();

  const searchedGroups = useSelector(getSearchedGroupData);

  const [displayGrps, setDisplayGrps] = useState(false);

  const toggleHeader = (header) => {
    setDisplayGrps(header === "groups");
  };
//   debugger;
//   if (!searchedGroups) return null; 

// console.log(searchedGroups)

  return (
    <div className="search-results">
      <div id="search-heading">
        Groups
      </div>

        <div id="group-results">
          {searchedGroups && 
          searchedGroups.length > 0 &&
            searchedGroups.map((group) => (
            <Link key={group.id} to={`/groups/${group.id}`}>
              <div key={group.id} className="presentGroups">
                  <h3 className="groupName">{group.name}</h3>
                  <p className="groupDescription">{group.description}</p>
                </div>
            </Link>
            ))}
            {
                (!searchedGroups || searchedGroups.length === 0) && <div> No group found </div>
            }
        </div>
        {/* <Footer/> */}
    </div>
  );
};

export default SearchResults;
