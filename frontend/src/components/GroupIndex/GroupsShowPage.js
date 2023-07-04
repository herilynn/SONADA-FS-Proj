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
    <div className="google-map">
      <StreetMap/>
    </div>
    <div className="Title">{`${group.name}`}</div>
    <img className = "mapMarker" src="https://icons-for-free.com/iconfiles/png/512/map+marker+icon-1320166582858325800.png"></img>
    <div className="location">{`${group.location}`}</div>
    <img className="memberMarker" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Noun_Project_people_icon_3376085.svg/1024px-Noun_Project_people_icon_3376085.svg.png"></img>
    <img className="creatorMarker" src="https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"></img>
    <div className="organizer">{`${group.email}`}</div>
    <div className="members">At least 1</div>
    <img className="showImg" src="https://static.vecteezy.com/system/resources/previews/001/970/338/original/building-under-construction-site-free-vector.jpg"></img>
    <div className="groupButtons">
      <button type="submit" className="groupB">About</button>
      <button type="submit" className="groupB">Events</button>
      <button type="submit" className="groupB">Members</button>
      <button type="submit" className="groupB">Photos</button>
      <button type="submit" className="groupB">Discussions</button>
      <button type="submit" className="groupB">More</button>
    </div>

    <div className="groupDes">
      <div className="Details">What we're about</div>
      {/* {group.description} */}
        <div className="innerDes">
          {`${group.description}`}
        </div>
    </div>
    <UpdateGroupFormModal/>
    </div>
  )
}

export default GroupShow

// {
//   "session": {
//       "user": {
//           "id": 1,
//           "name": "John Smith",
//           "email": "demo@gmail.com",
//           "location": "New York, NY",
//           "createdAt": "2023-06-06T18:27:09.598Z",
//           "updatedAt": "2023-06-07T02:14:18.060Z"
//       }
//   },
//   "groups": {
//       "3": {
//           "id": 3,
//           "name": "AI Takeover",
//           "description": "No more 404 error.",
//           "location": "South Pole, AQ"
//       }
//   }
// }

// const description = groups[3]?.description;