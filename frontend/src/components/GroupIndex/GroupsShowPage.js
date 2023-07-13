import { useState, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector, useDispatch } from "react-redux";
import { getGroup, fetchGroup } from "../../store/group";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import UpdateGroupFormModal from "../UpdateGroupForm";
// import { getUser, usersInGroup } from "../../store/members";
import { setCurrentUser } from "../../store/session";
import Home from "../Map/map";
import { getMemberStatus, joinGroup, leaveGroup } from "../../store/memberships";

const GroupShow = () => {
  const dispatch = useDispatch()
  const {groupId} = useParams()
  const selectCurrentUser = (state) => state.session.user;
  const sessionUser = useSelector(selectCurrentUser);
  const group = useSelector(getGroup(groupId));
  // const owner = useSelector(getUser(group ? group.ownerId : null));
  const isMember = useSelector(getMemberStatus(sessionUser ? sessionUser.id : null, groupId));

  // const [isMember, setIsMember] = useState(false);


  // const sessionUser = useSelector((state) => state.session.user);

  // const sessionUser = useSelector(setCurrentUser)

  const [errors, setErrors] = useState([])
  // const history = useHistory()

  // const members = useSelector(usersInGroup(groupId))

  // useEffect(() => {
  //   const storedIsMember = localStorage.getItem("isMember");
  //   setIsMember(storedIsMember === "true"); 
  //   dispatch(fetchGroup(groupId));
  // }, [dispatch, groupId]);

  // useEffect(() => {
  //   localStorage.setItem("isMember", isMember);
  // }, [isMember]);

  // useEffect(() => {
  //   dispatch(fetchGroup(groupId))
  // }, [groupId])

  if (!group) {
    return <div>Loading...</div>;
  }
  // const isOwner = group.ownerId === sessionUser.id;
  const isOwner = sessionUser && group.ownerId === sessionUser.id;

  // const toggleMembership = () => {
  //   setIsMember((prevState) => !prevState);
  // };

  // const joinLeaveButtonText = isMember ? "Leave" : "Join";

  // console.log('group.ownerId:', group.ownerId);
  // console.log('sessionUser.id:', sessionUser.id);
  // console.log('isOwner:', isOwner);
  // const description = group[3]?.description;

  const toggleMembership = (e) => {
    e.preventDefault();

    if(isMember) {
        dispatch(leaveGroup(groupId));
    } else {
        dispatch(joinGroup(groupId));
    }
}

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
          User #{`${group.ownerId}`}
        </div>
        <div className="members">
        <img className="memberMarker" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Noun_Project_people_icon_3376085.svg/1024px-Noun_Project_people_icon_3376085.svg.png"></img>
          At least 1
        </div>
        {sessionUser && !isOwner && (
          <button className="membershipButton" onClick={toggleMembership}>
            {isMember ? "Leave this group" : "Join this group"}
          </button>
        )}
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

