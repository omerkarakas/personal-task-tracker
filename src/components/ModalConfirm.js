import PropTypes from 'prop-types';
import { Button, Box, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import BlockIcon from '@mui/icons-material/Block';
import { CustomizedBox } from '../components/CustomizedBox';
import Modal from './Modal';

const ModalConfirm = ({ message, showCondition, closeAction, confirmAction }) => {
  return (
    <Modal open={showCondition} close={closeAction} message={message}>
      <CustomizedBox
        sx={{
          justifyContent: 'space-around',
          alignItems: 'center',
          alignSelf: 'stretch'
        }}>
        <Typography variant="h5">{message}</Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignSelf: 'stretch'
          }}>
          <Button
            variant="text"
            color="primary"
            startIcon={<CheckIcon />}
            onClick={confirmAction}
            className="btn-yes">
            <Typography variant="h5">Yes</Typography>
          </Button>
          <Button
            variant="text"
            color="secondary"
            startIcon={<BlockIcon />}
            onClick={closeAction}
            className="btn-no">
            <Typography variant="h5">No</Typography>
          </Button>
        </Box>
      </CustomizedBox>
    </Modal>
  );
};

ModalConfirm.propTypes = {
  message: PropTypes.string.isRequired,
  showCondition: PropTypes.bool.isRequired,
  closeAction: PropTypes.func,
  confirmAction: PropTypes.func
};

export default ModalConfirm;
