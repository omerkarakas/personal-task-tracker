import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import Modal from './Modal';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import BlockIcon from '@mui/icons-material/Block';
import { CustomizedBox } from '../components/CustomizedBox';

const ModalConfirm = ({
  message,
  showCondition,
  closeAction,
  confirmAction,
}) => {
  return (
    <Modal open={showCondition} close={closeAction} message={message}>
      <CustomizedBox
        sx={{
          justifyContent: 'space-around',
          alignItems: 'center',
          alignSelf: 'stretch',
        }}
      >
        <Typography variant="h4">{message}</Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignSelf: 'stretch',
          }}
        >
          <Button
            variant="text"
            color="primary"
            startIcon={<CheckIcon />}
            onClick={confirmAction}
          >
            <Typography variant="h4">Yes</Typography>
          </Button>
          <Button
            variant="text"
            color="secondary"
            startIcon={<BlockIcon />}
            onClick={closeAction}
          >
            <Typography variant="h4">No</Typography>
          </Button>
        </Box>
      </CustomizedBox>
    </Modal>
  );
};

export default ModalConfirm;
