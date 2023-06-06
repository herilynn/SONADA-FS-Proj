import { Link } from "react-router-dom/cjs/react-router-dom.min"

const GroupIndexItem = ({group}) => {


return (
  <>
    <li className='group'>
      <Link to={`groups/${group.id}`} className='groupName'>{`${group.name}`}</Link>
      <br/>
        {/* <li>{`${group.id}`}</li> */}
      <li>{`${group.description}`}</li>
    </li>
  </>
  )
}

export default GroupIndexItem