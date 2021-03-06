import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress, Grid, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import { ModalFotosInmueble } from './ModalFotosInmueble';
import { Formik } from 'formik';
import axios from 'axios';
import { ENDPOINT } from '../../api/config';
import { toast } from 'react-toastify';

function ModalInmueble({ open, closeModal, inmueble, setInmueble, barrios, loading, submitForm }) {
  const [openFotos, setOpenFotos] = useState(false);
  const [formImagenes, setFormImagenes] = useState({
    imagenes: '',
    inmueble_id: inmueble.id
  });
  const [loadingForm, setLoadingForm] = useState(false);
  const gestiones = ['Arriendo', 'Venta'];
  const opciones = [{ text: 'Si', value: 1 }, { text: 'No', value: 0 }];
  const openModalFotos = () => setOpenFotos(true);
  const closeModalFotos = () => setOpenFotos(false);

  const submitFotos = async(valuesForm) => {
    setLoadingForm(true);
    setFormImagenes(valuesForm);
    const formData = new FormData();
    formData.append('imagenes', valuesForm.imagenes);
    formData.append('inmueble_id', inmueble.id);
    const resFotos = await axios({
      method: 'POST',
      url: `${ENDPOINT}fotos/add`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    setTimeout(() => {
      setLoadingForm(false);
      const { message, inmueble } = resFotos.data;
      setInmueble(inmueble);
      toast.success(message);
    }, 2000);
  };

  const deleteFoto = async(id) => {
    setLoadingForm(true);
    const resFotos = await axios({
      method: 'DELETE',
      url: `${ENDPOINT}fotos/${id}`
    });
    setTimeout(() => {
      setLoadingForm(false);
      const { message, inmueble } = resFotos.data;
      setInmueble(inmueble);
      toast.success(message);
    }, 2000);
  };

  return (
    <>
      <ModalFotosInmueble
        open={openFotos}
        closeModal={closeModalFotos}
        fotos={inmueble.fotos}
        formImagenes={formImagenes}
        submitForm={submitFotos}
        loading={loadingForm}
        deleteFoto={deleteFoto}>
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
          {({ values, handleSubmit, handleChange, errors, touched, setFieldValue }) => {
            return (
              <form
                onSubmit={handleSubmit}>
                <DialogTitle>Informaci??n del Inmueble</DialogTitle>
                <DialogContent>
                  <Grid sx={{ marginTop: 1 }} container spacing={2}>
                    <Grid item xs={4}>
                      <FormControl fullWidth>
                        <InputLabel id='labelTipoGestion'>Tipo de Gesti??n</InputLabel>
                        <Select
                          name='tipo'
                          labelId='labelTipoGestion'
                          label='Tipo de Gesti??n'
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
                          label="N?? de Pisos"
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
                          label="N?? de Habitaciones"
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
                          label="N?? de Banios"
                          type='number'
                          variant='outlined'
                          value={values.numeroBanios}
                          onChange={handleChange} />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <TextField
                          name='direccion'
                          label="Direcci??n"
                          type='text'
                          variant='outlined'
                          value={values.direccion}
                          onChange={handleChange} />
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
                        <Button variant='contained' onClick={openModalFotos}>Galeria de Fotos</Button>
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