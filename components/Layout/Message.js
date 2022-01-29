import { Snackbar, Alert } from '@mui/material';

function Message({ state, setState }) {
  return (
    <Snackbar
      open={state.open}
      autoHideDuration={2000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      onClose={setState}>
      <Alert
        severity={state.type}
        sx={{ width: '100%' }}
        onClose={setState}>
        { state.message }
      </Alert>
    </Snackbar>
  )
}

export { Message };