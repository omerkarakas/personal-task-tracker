import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

const Modal = ({ open, close, children }) => {
  return (
    <div className={`${open ? 'modal-overlay show-modal' : 'modal-overlay'}`}>
      <div className="modal-container">
        {children}
        <IconButton className="close-modal-btn" aria-label="delete" size="small" onClick={close}>
          <CloseIcon fontSize="inherit" />
        </IconButton>
      </div>
    </div>
  );
};

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};

export default Modal;
