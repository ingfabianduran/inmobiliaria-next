import { useState } from 'react';
import { Layout } from '../../components/Layout/Layout';
import { Container, Grid } from '@mui/material';
import { CardInmueble } from '../../components/Inmobiliaria/CardInmueble';
import { PaginationPage } from '../../components/Layout/PaginationPage';
import { Loader } from '../../components/Layout/Loader';
import { ENDPOINT } from '../../api/config';

export default function Home({ inmuebles, numPages }) {
  return (
    <Layout>
      <Loader
        loading={false}> 
      </Loader>
      <Container
        className='container'>
        <Grid 
          container
          rowSpacing={3}>
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
                    costo={inmueble.costo}>
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
    </Layout>
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