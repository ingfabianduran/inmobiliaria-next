import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

function Loader({ loading }) {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}>
      <CircularProgress
        color='inherit'
        size={65}>
      </CircularProgress>
    </Backdrop>
  )
}

export { Loader };