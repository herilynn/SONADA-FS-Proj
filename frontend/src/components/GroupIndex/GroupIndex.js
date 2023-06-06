import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Group from '../Group';
import { getGroups, fetchGroups } from '../../store/group';
import { createGroup } from '../../store/group';
import { searchGroups } from '../../store/group';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import "./GroupIndex.css";
import GroupIndexItem from './GroupItemIndex';

const GroupIndex = () => {
  const dispatch = useDispatch()
  const groups = useSelector(getGroups)
  const history = useHistory()
  // const [groups, setGroups] = useState("");
  // console.log(groups)

  // const [name, setName] = useState("");



  useEffect(() => {
    console.log('rerendering')
    dispatch(fetchGroups())
  }, [])
  if (groups === undefined || groups === null || groups.length === 0) {
    return null;
  }
  
  // useEffect(() => {
  //   dispatch(fetchGroups(), [])
  //   if (groups !== undefined || groups !== null || groups.length !==0) {
  //   }
  // }
  // )

function handleSubmit() {
  const group = {name: 'watermelon', description: "potato", location: "Kansas"}
  dispatch(createGroup(group))
}

const handleSubmit2 = (group) => {
  history.replace(`/groups/${group.id}`) 
};

// const handleSubmit = async(e) => {
//   e.preventDefault();
//   await dispatch(fetchGroups());
//   history.pushState("/groups")
// }

// console.log(groups)
  return (
    <>
    {/* <h1>This is group page</h1>
    <h1>This is group page</h1>
    <h1>This is group page</h1>
    <h1>This is group page</h1>
    <h1>This is group page</h1> */}
    {/* <input type = "text" value = {name} onChange = {(e) => setName(e.target.value)} /> */}
    <button onClick={handleSubmit}>Add Group</button>
    <ul className='gIndex'>
      {
        groups && groups.map((group) => 
        <GroupIndexItem group = {group} key = {group.id}/>
        )
      }
      
    </ul>
    </>
  )
}
export default GroupIndex
