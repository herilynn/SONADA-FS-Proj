import React, { useState } from 'react';
import { Modal } from '../../Context/Modal';
import UpdateGroupForm from './UpdateGroup';

function UpdateGroupFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='updateGroup' onClick={() => setShowModal(true)}>Update group</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UpdateGroupForm />
        </Modal>
      )}
    </>
  );
}

export default UpdateGroupFormModal;