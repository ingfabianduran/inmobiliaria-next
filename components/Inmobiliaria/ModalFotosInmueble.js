import React from 'react';
import { Dialog, DialogContent, ImageList, ImageListItem } from '@mui/material';

function ModalFotosInmueble({ open, closeModal, fotos }) {
  return (
    <Dialog
      open={open}
      onClose={closeModal}
      fullWidth
      maxWidth='md'>
      <DialogContent>
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
              </ImageListItem>
            ))
          }
        </ImageList>
      </DialogContent>
    </Dialog>
  )
}

export { ModalFotosInmueble };