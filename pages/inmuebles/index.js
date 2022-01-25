import { useState } from 'react';
import Head from 'next/head';
import { Container, Grid } from '@mui/material';
import { CardInmueble } from '../../components/Inmobiliaria/CardInmueble';
import { PaginationPage } from '../../components/Layout/PaginationPage';
import { ENDPOINT } from '../../api/config';
import { ModalInmueble } from '../../components/Inmobiliaria/ModalInmueble';

export default function Home({ inmuebles, numPages }) {
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <>
      <Head>
        <title>Inmuebles</title>
      </Head>
      <ModalInmueble
        open={open}
        closeModal={closeModal}>
      </ModalInmueble>
      <Container
        className='container'>
        <Grid 
          container
          rowSpacing={3}
          justifyContent='center'
          alignItems='center'
          sx={{ minHeight: '80vh' }}>
          {
            inmuebles.map(inmueble => (
              <Grid
                key={inmueble.id}
                item
                xs={4}>
                  <CardInmueble
                    imagen={inmueble.fotos[0].url}
                    tipo={inmueble.tipo}
                    barrio={inmueble.barrio.nombre}
                    costo={inmueble.costo}
                    openModal={openModal}>
                  </CardInmueble>
              </Grid>
            ))
          }
        </Grid>
        <PaginationPage
          numPages={numPages}
          url='/inmuebles'>
        </PaginationPage>
      </Container>
    </>
  )
}

export async function getServerSideProps(context) {
  const page = context.query.page || 1;
  const res = await fetch(`${ENDPOINT}inmuebles/all?page=${page}`);
  const { data, last_page } = await res.json();
  return {
    props: {
      inmuebles: data,
      numPages: last_page
    }
  }
}