import React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

function Footer() {
  return (
    <Paper
      sx={{ bottom: 0, left: 0, right: 0, backgroundColor: '#F25C05' }}
      elevation={3}>
      <Box
        className='footer' 
        sx={{ textAlign: 'center', padding: 2, fontWeight: 'bold', fontSize: 12, color: 'white' }}>
        Fabian Duran - 2022
      </Box>
    </Paper>
  )
}

export { Footer };