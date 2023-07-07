import { useState, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector, useDispatch } from "react-redux";
import { getGroup, fetchGroup } from "../../store/group";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import UpdateGroupFormModal from "../UpdateGroupForm";
import { getUser, usersInGroup } from "../../store/members";
import { setCurrentUser } from "../../store/session";
import Home from "../Map/map";
import StreetMap from "../Map/map";

const GroupShow = () => {
  const dispatch = useDispatch()
  const {groupId} = useParams()
  const group = useSelector(getGroup(groupId))

  const sessionUser = useSelector(setCurrentUser)

  const [errors, setErrors] = useState([])
  // const history = useHistory()

  const members = useSelector(usersInGroup(groupId))

  const owner = useSelector(getUser(group ? group.ownerId : null))

  const isOwner = (sessionUser && owner) && sessionUser.id === owner.id;


  useEffect(() => {
    dispatch(fetchGroup(groupId))
  }, [groupId])

  if (!group) {
    return <div>Loading...</div>;
    // history.replace('/');
  }
  // const description = group[3]?.description;
  return (
    <div className="groupInfo">
      <div className="groupInfoLeft">
        <img className="showImg" src="https://static.vecteezy.com/system/resources/previews/001/970/338/original/building-under-construction-site-free-vector.jpg"></img>
        {isOwner && (
          <div className="updateButton">
            <UpdateGroupFormModal />
          </div>
        )}
        <div className="groupDes">
          <div className="Details">What we're about</div>
          {/* {group.description} */}
            <div className="innerDes">
              {`${group.description}`}
            </div>
        </div>
      </div>
      <div className="groupInfoRight">
        <div className="Title">
          {`${group.name}`}
      </div>
        <div className="location">
          <img className = "mapMarker" src="https://icons-for-free.com/iconfiles/png/512/map+marker+icon-1320166582858325800.png"></img>
          {`${group.location}`}
        </div>
        <div className="organizer">
        <img className="creatorMarker" src="https://www.pngimages.in/uploads/png-webp/2023/2023-January/Profile_Icon.webp"></img>
          {`${group.email}`}
        </div>
        <div className="members">
        <img className="memberMarker" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Noun_Project_people_icon_3376085.svg/1024px-Noun_Project_people_icon_3376085.svg.png"></img>
          At least 1
        </div>
        <div className="google-map">
          <Home center={{lat:group.latitude, lng:group.longitude}}/>
        </div>
      </div>
    {/* <div className="groupButtons">
      <button type="submit" className="groupB">About</button>
      <button type="submit" className="groupB">Events</button>
      <button type="submit" className="groupB">Members</button>
      <button type="submit" className="groupB">Photos</button>
      <button type="submit" className="groupB">Discussions</button>
      <button type="submit" className="groupB">More</button>
    </div> */}
  </div>
  )
}

export default GroupShow

