import React, { useState } from 'react';
import { Modal } from '../../Context/Modal';
import GroupForm from './GroupForm';
import { useSelector } from 'react-redux';

function GroupFormModal() {
  const [showModal, setShowModal] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);

  if (!sessionUser) {
    return null;
  }

  return (
    <>
      <button className='createGroup' onClick={() => setShowModal(true)}>Start a new group</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <GroupForm />
        </Modal>
      )}
    </>
  );
}

export default GroupFormModal;