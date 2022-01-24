import { Layout } from '../components/Layout/Layout';
import { Container, Grid, Stack, Pagination } from '@mui/material';
import { CardInmueble } from '../components/Inmobiliaria/CardInmueble';

export default function Home({ inmuebles, numPages }) {
  return (
    <Layout>
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
                    imagen='https://via.placeholder.com/640x480.png/00dd66?text=quae'
                    tipo={inmueble.tipo}
                    barrio='Villa Luz'
                    costo='950.000'>
                  </CardInmueble>
              </Grid>
            ))
          }
        </Grid>
        <Stack
          sx={{ marginTop: 3, marginBottom: 3 }}
          spacing={2}>
          <Pagination
            sx={{ display: 'flex', justifyContent: 'center', }}
            color='primary'
            count={numPages}>
          </Pagination>
        </Stack>
      </Container>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const res = await fetch('http://127.0.0.1:8000/api/inmuebles/all');
  const { data, last_page } = await res.json();
  return {
    props: {
      inmuebles: data,
      numPages: last_page
    }
  }
}