import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const CustomizedBox = styled(Box)(() => ({
  marginTop: 20,
  marginBottom: 20,
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
}));
