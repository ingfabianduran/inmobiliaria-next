import { useState, useEffect } from 'react';
import Head  from 'next/head'
import { Container, Box, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { PaginationPage } from '../../components/Layout/PaginationPage';
import axios from 'axios';
import { ENDPOINT } from '../../api/config';

export default function Home({ tipoPersona, dataTable, numPages, currentPage }) {
  const [page, setPage] = useState(1);
  const tableCabecera = [
    { field: 'numeroDocumento', headerName: 'Identificación', flex: 1, headerAlign: 'center', headerClassName: 'header-table' },
    { field: 'nombres', headerName: 'Nombres', flex: 1, headerAlign: 'center', headerClassName: 'header-table' },
    { field: 'apellidos', headerName: 'Apellidos', flex: 1, headerAlign: 'center', headerClassName: 'header-table' },
    { field: 'correo', headerName: 'Correo Electronico', flex: 1, headerAlign: 'center', headerClassName: 'header-table' },
    { 
      field: 'actions', 
      headerName: 'Actions', 
      width: 300,
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'header-table',
      renderCell: ({ row }) => (
        <>
          <Button
            variant='contained'
            color='inherit'
            sx={{ marginRight: 1 }}
            onClick={() => getPersona(row.id)}>
            Editar
          </Button>
          <Button
            variant='contained'
            color='error'
            onClick={() => deletePersona(row.id)}>
            Eliminar
          </Button>
        </>
      ) 
    },
  ];

  useEffect(() => {
    setPage(currentPage);
  }, [tipoPersona]);

  const getPersona = async(id) => {
    console.log(id);
  };
  const deletePersona = async(id) => {
    console.log(id);
  };

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
  const { data, last_page, current_page } = resPersonas.data;
  const dataTable = data.map(({ id, persona }) => {
    return {
      id: id,
      numeroDocumento: persona.numeroDocumento,
      nombres: persona.nombres,
      apellidos: persona.apellidos,
      correo: persona.correoElectronico,
    }
  });
  return {
    props: {
      tipoPersona: tipoPersona,
      dataTable: dataTable,
      numPages: last_page,
      currentPage: current_page
    }
  };
}