import { useState } from 'react';
import { Input, Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress, Grid, FormControl, InputLabel, Select, MenuItem, TextField, FormControlLabel, Checkbox, FormGroup } from '@mui/material';
import { ModalFotosInmueble } from './ModalFotosInmueble';
import { Formik } from 'formik';

function ModalInmueble({ open, closeModal, inmueble, barrios, loading, submitForm }) {
  const [openFotos, setOpenFotos] = useState(false);
  const openModalFotos = () => setOpenFotos(true);
  const closeModalFotos = () => setOpenFotos(false);
  const gestiones = ['Arriendo', 'Venta'];
  const opciones = [{ text: 'Si', value: 1 }, { text: 'No', value: 0 }];
  
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
          onSubmit={values => {
            submitForm(values, inmueble.id) 
          }}>
          {({ values, handleSubmit, handleChange, errors, touched }) => {
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
                          name='tipo'
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
                          name='costo'
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
                          name='barrio_id'
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
                          name='metrosCuadrados'
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
                          name='numeroPisos'
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
                          name='numeroHabitaciones'
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
                          name='numeroBanios'
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
                          name='direccion'
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
                          <Input accept='image/*' name='fotos' multiple type='file' style={{ display: 'none' }} />
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
                        <InputLabel id='tieneSalaComedorId'>Sala Comedor</InputLabel>
                        <Select
                          name='tieneSalaComedor'
                          labelId='tieneSalaComedorId'
                          label='Sala Comedor'
                          value={values.tieneSalaComedor}
                          onChange={handleChange}>
                          {
                            opciones.map(item => (
                              <MenuItem key={item.text} value={item.value}>{ item.text }</MenuItem>
                            ))
                          }
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                      <FormControl fullWidth>
                          <InputLabel id='tieneGarajeId'>Garaje</InputLabel>
                          <Select
                            name='tieneGaraje'
                            labelId='tieneGarajeId'
                            label='Tiene Garaje'
                            value={values.tieneGaraje}
                            onChange={handleChange}>
                            {
                              opciones.map(item => (
                                <MenuItem key={item.text} value={item.value}>{ item.text }</MenuItem>
                              ))
                            }
                          </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                      <FormControl fullWidth>
                        <InputLabel id='estaActivoId'>Esta Activo</InputLabel>
                        <Select
                          name='estaActivo'
                          labelId='estaActivoId'
                          label='Esta Activo'
                          value={values.estaActivo}
                          onChange={handleChange}>
                          {
                            opciones.map(item => (
                              <MenuItem key={item.text} value={item.value}>{ item.text }</MenuItem>
                            ))
                          }
                        </Select>
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
                        <Button variant='contained' color='inherit' onClick={closeModal}>Cancelar</Button>
                        <Button variant='contained' type='submit'>Guardar</Button>
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