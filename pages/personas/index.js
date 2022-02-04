import { useState } from 'react';
import Head  from 'next/head'
import { Container, Box, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { PaginationPage } from '../../components/Layout/PaginationPage';
import axios from 'axios';
import { ENDPOINT } from '../../api/config';

export default function Home({ tipoPersona, dataTable, numPages }) {
  const [page, setPage] = useState(1);
  const tableCabecera = [
    { field: 'numeroDocumento', headerName: 'Identificación', flex: 1 },
    { field: 'nombres', headerName: 'Nombres', flex: 1 },
    { field: 'apellidos', headerName: 'Apellidos', flex: 1 },
    { field: 'correo', headerName: 'Correo Electronico', flex: 1 },
    { 
      field: 'actions', 
      headerName: 'Actions', 
      width: 300,
      renderCell: () => (
        <>
          <Button
            variant='contained'
            color='secondary'
            sx={{ marginRight: 1 }}>
            Editar
          </Button>
          <Button
            variant='contained'
            color='error'>
            Eliminar
          </Button>
        </>
      ) 
    },
  ];

  return (
    <>
      <Head>
        <title>{ tipoPersona }</title>
      </Head>
      <Container
        className='container'
        fixed>
        <Box 
          style={{  width: '100%', backgroundColor: 'white' }}>
          <DataGrid
            autoHeight={true}
            columns={tableCabecera}
            rows={dataTable}
            hideFooter>
          </DataGrid>
        </Box>
        <PaginationPage
          numPages={numPages}
          url={`/personas?tipo=${tipoPersona}&&`}
          page={page}
          setPage={setPage}>
        </PaginationPage>
      </Container>
    </>
  )
}

export async function getServerSideProps(context) {
  const tipoPersona = context.query.tipo || 'Arrendador';
  const page = context.query.page || 1;
  const resPersonas = await axios({
    method: 'GET',
    url: `${ENDPOINT}rolesPersonas/${tipoPersona}/?page=${page}`
  });
  const { data, last_page } = resPersonas.data;
  const dataTable = data.map(({ id, persona }) => {
    return {
      id: id,
      numeroDocumento: persona.numeroDocumento,
      nombres: persona.nombres,
      apellidos: persona.apellidos,
      correo: persona.correoElectronico
    }
  });
  return {
    props: {
      tipoPersona: tipoPersona,
      dataTable: dataTable,
      numPages: last_page
    }
  };
}