import React from 'react';
import { useDispatch } from 'react-redux';

const Group = ({group}) => {
  const dispatch = useDispatch()

  return (
    <>
    <li>
      {/* <p> {group.title} </p> */}
      {/* <Link to = {`groups/${group.id}/edit`}>Edit</Link> */}
    </li>
    </>
  )
}
export default Group