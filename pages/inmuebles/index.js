import { useState } from 'react';
import Head from 'next/head';
import { Container, Grid, SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';
import { AddBusiness } from '@mui/icons-material';
import { CardInmueble } from '../../components/Inmobiliaria/CardInmueble';
import { PaginationPage } from '../../components/Layout/PaginationPage';
import { ENDPOINT } from '../../api/config';
import { ModalInmueble } from '../../components/Inmobiliaria/ModalInmueble';
import { Message } from '../../components/Layout/Message';
import { useRouter } from 'next/router';
import { INMUEBLE, MESSAGE } from '../../states/states';
import axios from 'axios';
import imageHouse from '../../images/House.jpg';

export default function Home({ inmuebles, numPages, barrios }) {
  
  const listSpeedActions = [
    { texto: 'Registrar Inmueble', icon: <AddBusiness></AddBusiness> }
  ];
  const [open, setOpen] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);
  const [tipoSubmit, setTipoSubmit] = useState('POST');
  const [stateAlert, setStateAlert] = useState(MESSAGE);
  const [inmueble, setInmueble] = useState(INMUEBLE);
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
    // const formData = new FormData();
    // for (const key in valuesForm) formData.append(key, valuesForm[key]);
    setLoadingForm(true);
    const url = id === '' ? `${ENDPOINT}inmuebles/add` : `${ENDPOINT}inmuebles/${id}`;
    const resInmueble = await axios({
      url: url,
      method: tipoSubmit,
      data: valuesForm,
      // headers: {
      //   'Content-Type': 'multipart/form-data'
      // }
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
                    imagen={inmueble.fotos.length > 0 ? inmueble.fotos[0].url : imageHouse.src }
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
          <SpeedDial
            ariaLabel='Agregar Inmueble'
            sx={{ position: 'absolute', bottom: 16, right: 1 }}
            icon={<SpeedDialIcon></SpeedDialIcon>}>
            {
              listSpeedActions.map(item => (
                <SpeedDialAction
                  key={item.texto}
                  icon={item.icon}
                  tooltipTitle={item.texto}
                  onClick={() => {
                    setOpen(true);
                    setInmueble(INMUEBLE);
                  }}>
                </SpeedDialAction>
              ))
            }
          </SpeedDial>
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