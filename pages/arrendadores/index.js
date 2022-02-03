import { PagePersona } from '../../components/RolPersona/PagePersona';
import { getPersonas } from '../../api/serverSide';

export default function Home({ tipoPersona, dataTable }) {
  return (
    <>
      <PagePersona>
      </PagePersona>
    </>
  )
}

export async function getServerSideProps(context) {
  getPersonas(context);
  return {
    props: {
      tipoPersona: '',
      dataTable: []
    }
  }
}