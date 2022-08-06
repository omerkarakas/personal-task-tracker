import React, { useContext } from 'react';
import { FaTimes } from 'react-icons/fa';

const Modal = ({ open, close, children }) => {
  return (
    <div className={`${open ? 'modal-overlay show-modal' : 'modal-overlay'}`}>
      <div className="modal-container">
        {children}
        <button className="close-modal-btn" onClick={close}>
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

export default Modal;
