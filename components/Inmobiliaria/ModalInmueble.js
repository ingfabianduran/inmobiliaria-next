import { useState } from 'react';
import { Input, Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress, Grid, FormControl, InputLabel, Select, MenuItem, TextField, FormControlLabel, Checkbox } from '@mui/material';
import { ModalFotosInmueble } from './ModalFotosInmueble';
import { Formik } from 'formik';

function ModalInmueble({ open, closeModal, inmueble, barrios, loading }) {
  const [openFotos, setOpenFotos] = useState(false);
  const openModalFotos = () => setOpenFotos(true);
  const closeModalFotos = () => setOpenFotos(false);
  const gestiones = ['Arriendo', 'Venta'];
  
  return (
    <>
      <ModalFotosInmueble
        open={openFotos}
        closeModal={closeModalFotos}
        fotos={inmueble.fotos}>
      </ModalFotosInmueble>
      <Dialog
        open={open}
        onClose={closeModal}
        fullWidth
        maxWidth='lg'>
        <Formik
          enableReinitialize
          initialValues={inmueble}
          onSubmit={values => console.log(values) }>
          {({ values, handleSubmit, handleChange, errors, touched }) => {
            console.log(values);
            return (
              <form
                onSubmit={handleSubmit}>
                <DialogTitle>Información del Inmueble</DialogTitle>
                <DialogContent>
                  <Grid sx={{ marginTop: 1 }} container spacing={2}>
                    <Grid item xs={4}>
                      <FormControl fullWidth>
                        <InputLabel id='labelTipoGestion'>Tipo de Gestión</InputLabel>
                        <Select
                          labelId='labelTipoGestion'
                          label='Tipo de Gestión'
                          value={values.tipo}
                          onChange={handleChange}>
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
                          variant='outlined'
                          value={values.costo}
                          onChange={handleChange} />
                      </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                      <FormControl fullWidth>
                        <InputLabel id='labelBarrioId'>Barrio</InputLabel>
                        <Select
                          labelId='labelBarrioId'
                          label='Barrio'
                          value={values.barrio_id}
                          onChange={handleChange}>
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
                          variant='outlined'
                          value={values.metrosCuadrados}
                          onChange={handleChange} />
                      </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl fullWidth>
                        <TextField
                          id='numeroPisos'
                          label="N° de Pisos"
                          type='number'
                          variant='outlined'
                          value={values.numeroPisos}
                          onChange={handleChange} />
                      </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl fullWidth>
                        <TextField
                          id='numeroHabitaciones'
                          label="N° de Habitaciones"
                          type='number'
                          variant='outlined'
                          value={values.numeroHabitaciones}
                          onChange={handleChange} />
                      </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl fullWidth>
                        <TextField
                          id='numeroBanios'
                          label="N° de Banios"
                          type='number'
                          variant='outlined'
                          value={values.numeroBanios}
                          onChange={handleChange} />
                      </FormControl>
                    </Grid>
                    <Grid item xs={10}>
                      <FormControl fullWidth>
                        <TextField
                          id='direccion'
                          label="Dirección"
                          type='text'
                          variant='outlined'
                          value={values.direccion}
                          onChange={handleChange} />
                      </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                      <FormControl fullWidth>
                        <label htmlFor='contained-button-file'>
                          <Input accept='image/*' id='contained-button-file' multiple type='file' style={{ display: 'none' }} />
                            <Button 
                              variant='contained' 
                              component='span' 
                              size='large'
                              fullWidth>
                              Cargar Fotos
                            </Button>
                        </label>
                      </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                      <FormControl fullWidth>
                        <FormControlLabel 
                          control={<Checkbox value={values.tieneSalaComedor} 
                          checked={values.tieneSalaComedor === 1 ? true : false} />} 
                          label='Sala Comedor'
                          onChange={handleChange}>  
                        </FormControlLabel>
                      </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                      <FormControl fullWidth>
                        <FormControlLabel 
                          control={<Checkbox value={values.tieneGaraje} 
                          checked={values.tieneGaraje === 1 ? true : false} />} 
                          label='Garaje'
                          onChange={handleChange}>
                        </FormControlLabel>
                      </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                      <FormControl fullWidth>
                        <FormControlLabel 
                          control={<Checkbox value={values.estaActivo} 
                          checked={values.estaActivo === 1 ? true : false} />} 
                          label='Activo'
                          onChange={handleChange}>
                        </FormControlLabel>
                      </FormControl>
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions>
                  {
                    loading ? 
                      <CircularProgress 
                        size={30}
                        sx={{ marginRight: 2 }} />
                    : 
                      <>
                        { inmueble.fotos.length > 0 && <Button variant='contained' onClick={openModalFotos}>Galeria de Fotos</Button> }
                        <Button variant='contained' color='inherit'>Cancelar</Button>
                        <Button variant='contained'>Guardar</Button>
                      </>
                  }
                </DialogActions>
              </form>
            )
          }}
        </Formik>
      </Dialog>
    </>
  )
}

export { ModalInmueble };