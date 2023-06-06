import { Link } from "react-router-dom/cjs/react-router-dom.min"

const GroupIndexItem = ({group}) => {


return (
  <>
    <li className='group'>
      <img className="imgPlaceholder" src="https://static.vecteezy.com/system/resources/previews/001/970/338/original/building-under-construction-site-free-vector.jpg"></img>
      <Link to={`groups/${group.id}`} className='groupName'>{`${group.name}`}</Link>
      <br/>
        {/* <li>{`${group.id}`}</li> */}
      {/* <li>{`${group.description}`}</li> */}
    </li>
  </>
  )
}

export default GroupIndexItem