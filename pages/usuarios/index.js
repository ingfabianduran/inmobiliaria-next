import { Grid, Box, Table, TableHead, TableRow, TableBody, TableCell, Button } from '@mui/material';
import { addUser, deleteUser } from '../../store/usuarios/actions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    usuarios: state.usuariosReducer.usuarios
  };
};

function Home({ usuarios, addUser, deleteUser }) {
  const tableCabecera = ['ID', 'Nombre', 'Actions'];
  return (
    <Grid>
      <Box sx={{ backgroundColor: 'white' }}>
        <Table>
          <TableHead>
            <TableRow>
              { tableCabecera.map(item => <TableCell key={item}>{ item }</TableCell>) }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              usuarios.map(item => (
                <TableRow
                  key={item.id}>
                    <TableCell>{ item.id }</TableCell>
                    <TableCell>{ item.name }</TableCell>
                    <TableCell>
                      <Button
                        variant='contained'
                        color='error'
                        onClick={() => deleteUser(item.id)}>
                        Eliminar
                      </Button>
                    </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </Box>
      <Button
        sx={{ marginTop: 1 }}
        variant='contained'
        size='large'
        onClick={() => addUser('Fabian Duran') }>
        Agregar Usuario
      </Button>
    </Grid>
  )
}

export default connect(mapStateToProps, { addUser, deleteUser })(Home);