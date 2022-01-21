import React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

function Footer() {
  return (
    <Paper
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
      elevation={3}>
      <Box 
        sx={{ textAlign: 'center', padding: 2, fontStyle: 'italic', fontWeight: 'bold', fontSize: 12 }}>
        Fabian Duran - 2022
      </Box>
    </Paper>
  )
}

export { Footer };