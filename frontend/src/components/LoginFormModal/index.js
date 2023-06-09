import React, { useState } from 'react';
import { Modal } from '../../Context/Modal';
import LoginForm from './LoginForm';
import "./LoginForm.css";

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
    <div>
      <button className='login' onClick={() => setShowModal(true)}>Log in</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
          
        </Modal>
      )}
    </div>
    </>
  );
}

export default LoginFormModal;