import { useState, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector, useDispatch } from "react-redux";
import { getGroup, fetchGroup } from "../../store/group";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import UpdateGroupFormModal from "../UpdateGroupForm";

const GroupShow = () => {
  const dispatch = useDispatch()
  const {groupId} = useParams()
  const group = useSelector(getGroup(groupId))

  const [errors, setErrors] = useState([])
  const history = useHistory()

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
    <div className="Title">{`${group.name}`}</div>
    <img className="showImg" src="https://static.vecteezy.com/system/resources/previews/001/970/338/original/building-under-construction-site-free-vector.jpg"></img>
    {/* <div></div> */}
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