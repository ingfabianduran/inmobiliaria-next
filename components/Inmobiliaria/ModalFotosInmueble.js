import React from 'react';
import { Dialog, DialogContent, DialogActions, ImageList, ImageListItem, ImageListItemBar, Button, Input, Alert } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { Formik } from 'formik';

function ModalFotosInmueble({ open, closeModal, fotos, formImagenes }) {
  return (
    <Dialog
      open={open}
      onClose={closeModal}
      fullWidth
      maxWidth='md'>
      <DialogContent>
        {
          fotos.length > 0 ?
            <ImageList
              sx={{ width: 850, height: 450 }}
              cols={4}
              rowHeight={200}>
              {
                fotos.map(item => (
                  <ImageListItem
                    key={item.id}>
                    <img
                      src={`${item.url}`}
                      srcSet={`${item.url}`}
                      alt='Imagen Inmueble' 
                      loading='lazy' />
                      <ImageListItemBar
                        actionIcon={
                          <Button
                            sx={{ margin: 1 }}
                            variant='contained'
                            color='error'
                            startIcon={<Delete />}>
                            Eliminar
                          </Button>
                        } />
                  </ImageListItem>
                ))
              }
            </ImageList>
          : 
            <Alert severity="info">No hay fotos cargadas. Por favor seleccione y cargue las fotos</Alert>
        }
      </DialogContent>
      <DialogActions>
      <Formik
        enableReinitialize
        initialValues={formImagenes}
        onSubmit={values => {
          console.log(values);
        }}>
        {({ values, handleSubmit, handleChange, errors, touched, setFieldValue }) => {
          return (
            <form
              onSubmit={handleSubmit}>
              <label 
                htmlFor='contained-button-file'>
                <Input
                  accept='image/*' 
                  id='contained-button-file' 
                  name='imagenes' 
                  multiple 
                  type='file' 
                  style={{ display: 'none' }} 
                  onChange={e => {
                    const files = e.target.files[0];
                  }} />
                <Button 
                  sx={{ marginRight: 1 }} 
                  variant='contained' 
                  component='span'
                  color='inherit'>
                  Seleccionar Fotos
                </Button>
              </label>
              <Button 
                type='submit'
                variant='contained' 
                component='span'>
                Subir Fotos
              </Button>
            </form>
          )}}
        </Formik>
      </DialogActions>
    </Dialog>
  )
}

export { ModalFotosInmueble };