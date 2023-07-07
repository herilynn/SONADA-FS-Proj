import './footer.css';
import GroupFormModal from '../GroupForm';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import SignupFormModal from '../SignupFormModal';
import SignupForm from '../SignupFormModal/SignupForm';

const Footer = () => {
  return (  
    <footer className="footer">
      <div className='groupFooter'>
        <GroupFormModal/>
      </div>

      <p className='line'>____________________________________________________________________________________________________________________________________________________________________________________</p>
      
      {/* <ul className='DiscoverFooter'>Discover</ul> */}

      <ul className='accFooter'>
        Your Account
      </ul>
      
        <div className='SU'> Sign Up </div>
        <div className='LI'>Log in</div>

    </footer>
  )
}

export default Footer