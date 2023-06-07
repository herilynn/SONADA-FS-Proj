import React, { useState } from 'react';
import { Modal } from '../../Context/Modal';
import GroupForm from './GroupForm';

function GroupFormModal() {
  const [showModal, setShowModal] = useState(false);

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