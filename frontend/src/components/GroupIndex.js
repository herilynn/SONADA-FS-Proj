import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Group from './Group';
import { getGroups, fetchGroups } from '../store/group';
import { createGroup } from '../store/group';


const GroupIndex = () => {
  const dispatch = useDispatch()
  const groups = useSelector(getGroups)
  useEffect(() => {
    dispatch(fetchGroups())
  }, [dispatch])
  if (groups === undefined || groups === null || groups.length === 0) {
    return null;
  }

function handleSubmit() {
  const group = {name: "Potato", description: "potato", location: "Kansas"}
  dispatch(createGroup(group))
}


console.log(groups)
  return (
    <>
    <h1>This is group page</h1>
    <h1>This is group page</h1>
    <h1>This is group page</h1>
    <h1>This is group page</h1>
    <h1>This is group page</h1>
    <button onClick={handleSubmit}>Submit</button>
    <ul>
      {
        groups && groups.map((group) => 
        <li>{`${group.id}`}</li>
        )
      }
      
    </ul>
    </>
  )
}
export default GroupIndex