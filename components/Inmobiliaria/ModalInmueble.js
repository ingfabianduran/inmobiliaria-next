import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, FormControl, InputLabel, Select, MenuItem, TextField, FormControlLabel, Checkbox } from '@mui/material';
import { ModalFotosInmueble } from './ModalFotosInmueble';

function ModalInmueble({ open, closeModal, inmueble, barrios }) {
  const [openFotos, setOpenFotos] = useState(false);
  const openModalFotos = () => setOpenFotos(true);
  const closeModalFotos = () => setOpenFotos(false);
  const gestiones = ['Arriendo', 'Venta'];
  
  return (
    <>
      <ModalFotosInmueble
        open={openFotos}
        closeModal={closeModalFotos}
        fotos={inmueble.inmueble.fotos || []}>
      </ModalFotosInmueble>
      <Dialog
        open={open}
        onClose={closeModal}
        fullWidth
        maxWidth='lg'>
        <form>
          <DialogTitle>Información del Inmueble</DialogTitle>
          <DialogContent>
            <Grid sx={{ marginTop: 1 }} container spacing={2}>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id='labelTipoGestion'>Tipo de Gestión</InputLabel>
                  <Select
                    labelId='labelTipoGestion'
                    label='Tipo de Gestión'>
                    {
                      gestiones.map(item => (
                        <MenuItem key={item} value={item}>{ item }</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <TextField
                    id='costo'
                    label="Costo"
                    type='number'
                    variant='outlined' />
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id='labelBarrioId'>Barrio</InputLabel>
                  <Select
                    labelId='labelBarrioId'
                    label='Barrio'>
                    {
                      barrios.map(item => (
                        <MenuItem key={item.id} value={item.id}>{ item.nombre }</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    id='metrosCuadrados'
                    label="Metros Cuadrados"
                    type='number'
                    variant='outlined' />
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    id='numeroPisos'
                    label="N° de Pisos"
                    type='number'
                    variant='outlined' />
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    id='numeroHabitaciones'
                    label="N° de Habitaciones"
                    type='number'
                    variant='outlined' />
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    id='numeroBanios'
                    label="N° de Banios"
                    type='number'
                    variant='outlined' />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    id='direccion'
                    label="Dirección"
                    type='text'
                    variant='outlined' />
                </FormControl>
              </Grid>
              <Grid item xs={2}>
                <FormControl fullWidth>
                  <FormControlLabel control={<Checkbox />} label='Sala Comedor'></FormControlLabel>
                </FormControl>
              </Grid>
              <Grid item xs={2}>
                <FormControl fullWidth>
                  <FormControlLabel control={<Checkbox />} label='Garaje'></FormControlLabel>
                </FormControl>
              </Grid>
              <Grid item xs={2}>
                <FormControl fullWidth>
                  <FormControlLabel control={<Checkbox />} label='Activo'></FormControlLabel>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={openModalFotos}>Galeria de Fotos</Button>
            <Button>Cancelar</Button>
            <Button>Guardar</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}

export { ModalInmueble };