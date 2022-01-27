import { useState } from 'react';
import Head from 'next/head';
import { Container, Grid } from '@mui/material';
import { CardInmueble } from '../../components/Inmobiliaria/CardInmueble';
import { PaginationPage } from '../../components/Layout/PaginationPage';
import { ENDPOINT } from '../../api/config';
import { ModalInmueble } from '../../components/Inmobiliaria/ModalInmueble';

export default function Home({ inmuebles, numPages, barrios }) {
  const [open, setOpen] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);
  const [inmueble, setInmueble] = useState({
    tipo: '',
    costo: '',
    barrio_id: '',
    metrosCuadrados: '',
    numeroPisos: '',
    numeroHabitaciones: '',
    numeroBanios: '',
    direccion: '',
    tieneSalaComedor: false,
    tieneGaraje: false,
    estaActivo: false,
    fotos: []
  });

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const showInmueble = async(id) => {
    setLoadingForm(true);
    const resInmueble = await fetch(`${ENDPOINT}inmuebles/${id}`);
    const data = await resInmueble.json();
    setTimeout(() => {
      setLoadingForm(false);
      setInmueble(data.inmueble);
    }, 2000);
  };

  return (
    <>
      <Head>
        <title>Inmuebles</title>
      </Head>
      <ModalInmueble
        open={open}
        closeModal={closeModal}
        inmueble={inmueble}
        barrios={barrios}
        loading={loadingForm}>
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
                    openModal={openModal}
                    loading={true}
                    showInmueble={() => showInmueble(inmueble.id)}>
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
  const resInmuebles = await fetch(`${ENDPOINT}inmuebles/all?page=${page}`);
  const resBarrios = await fetch(`${ENDPOINT}barrios/all`);
  const { data, last_page } = await resInmuebles.json();
  const { barrios } = await resBarrios.json();
  return {
    props: {
      inmuebles: data,
      numPages: last_page,
      barrios: barrios
    }
  }
}