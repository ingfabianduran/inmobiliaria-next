import { Layout } from '../components/Layout/Layout';
import Container from '@mui/material/Container';
import { CardInmueble } from '../components/Inmobiliaria/CardInmueble';

export default function Home() {
  return (
    <Layout>
      <Container
        className='container'>
        <CardInmueble
          imagen='https://via.placeholder.com/640x480.png/00dd66?text=quae'
          tipo='Venta'
          barrio='Villa Luz'
          costo='950.000'>
        </CardInmueble>
      </Container>
    </Layout>
  )
}
