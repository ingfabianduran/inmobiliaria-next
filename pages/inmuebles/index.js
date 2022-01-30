import { useState } from 'react';
import Head from 'next/head';
import { Container, Grid } from '@mui/material';
import { CardInmueble } from '../../components/Inmobiliaria/CardInmueble';
import { PaginationPage } from '../../components/Layout/PaginationPage';
import { ENDPOINT } from '../../api/config';
import { ModalInmueble } from '../../components/Inmobiliaria/ModalInmueble';
import { Message } from '../../components/Layout/Message';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Home({ inmuebles, numPages, barrios }) {
  const [open, setOpen] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);
  const [tipoSubmit, setTipoSubmit] = useState('POST');
  const [stateAlert, setStateAlert] = useState({
    open: false,
    type: 'success',
    message: ''
  });
  const [inmueble, setInmueble] = useState({
    id: '',
    tipo: '',
    costo: '',
    barrio_id: '',
    metrosCuadrados: '',
    numeroPisos: '',
    numeroHabitaciones: '',
    numeroBanios: '',
    direccion: '',
    tieneSalaComedor: 0,
    tieneGaraje: 0,
    estaActivo: 0,
    fotos: [],
  });
  const [page, setPage] = useState(1);
  const router = useRouter();

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const closeAlert = () => setStateAlert({ ...stateAlert, open: false });
  
  const showInmueble = async(id) => {
    setLoadingForm(true);
    const resInmueble = await axios({
      url: `${ENDPOINT}inmuebles/${id}`,
      method: 'GET'
    }); 
    setTimeout(() => {
      setTipoSubmit('PUT');
      setLoadingForm(false);
      setInmueble(resInmueble.data.inmueble);
    }, 2000);
  };

  const submitInmueble = async(valuesForm, id) => {
    setLoadingForm(true);
    const url = id === '' ? `${ENDPOINT}inmuebles` : `${ENDPOINT}inmuebles/${id}`;
    const resInmueble = await axios({
      url: url,
      method: tipoSubmit,
      data: valuesForm
    });
    const { message } = resInmueble.data;
    setStateAlert({ ...stateAlert, open: true, message: message });
    setOpen(false);
    setTipoSubmit('POST');
    setTimeout(() => {
      setLoadingForm(false);
      router.push('/inmuebles');  
    }, 2000);
  };

  return (
    <>
      <Head>
        <title>Inmuebles</title>
      </Head>
      <Message
        state={stateAlert}
        setState={closeAlert}>
      </Message>
      <ModalInmueble
        open={open}
        closeModal={closeModal}
        inmueble={inmueble}
        barrios={barrios}
        loading={loadingForm}
        submitForm={submitInmueble}>
      </ModalInmueble>
      <Container
        className='container'
        fixed>
        <Grid 
          container
          rowSpacing={3}
          justifyContent='center'
          alignItems='center'>
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
          url='/inmuebles'
          page={page}
          setPage={setPage}>
        </PaginationPage>
      </Container>
    </>
  )
}

export async function getServerSideProps(context) {
  const page = context.query.page || 1;
  const resInmuebles = await axios({ url: `${ENDPOINT}inmuebles/all?page=${page}`, method: 'GET' });
  const resBarrios = await axios({ url: `${ENDPOINT}barrios/all`, method: 'GET' }); 
  const { data, last_page } = resInmuebles.data;
  const { barrios } = resBarrios.data;
  return {
    props: {
      inmuebles: data,
      numPages: last_page,
      barrios: barrios
    }
  }
}