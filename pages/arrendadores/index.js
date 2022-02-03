import { PagePersona } from '../../components/RolPersona/PagePersona';
import { getPersonas } from '../../api/serverSide';

export default function Home({ dataTable }) {
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
      dataTable: []
    }
  }
}