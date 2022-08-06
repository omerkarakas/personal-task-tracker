import { Box, Typography } from '@mui/material';
import React from 'react';
import pic from '../assets/images/company-logo.png';

const Header = () => {
  return (
    <Box>
      <img src={pic} alt="company-logo" width="120" />
      <Typography variant="h3" align="center">
        Personal Task Tracker
      </Typography>
      <hr />
    </Box>
  );
};

export default Header;
