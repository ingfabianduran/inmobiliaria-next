import React from 'react';
import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';

function CardInmueble({ imagen, tipo, barrio, costo }) {
  return (
    <Card
      sx={{ maxWidth: 345 }}
      elevation={3}>
      <CardActionArea>
        <CardMedia
          component='img'
          height='140'
          image={imagen}
          alt='Foto del Inmueble'>
        </CardMedia>
        <CardContent>
          <Typography
            gutterBottom
            variant='h5'
            component='div'>
            { tipo }
          </Typography>
          <Typography
            variant='body2' 
            color='text.secondary'
            sx={{ textAlign: 'justify' }}>
            { `Ubicado en el barrio ${barrio}. Tiene un costo de $ ${costo}` }
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export { CardInmueble };