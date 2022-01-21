import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function Navbar() {
  return(
    <AppBar
      position='static'>
      <Toolbar>
        <Typography>Inbobiliaria Duran</Typography>
      </Toolbar>
    </AppBar>
  )
}

export { Navbar };