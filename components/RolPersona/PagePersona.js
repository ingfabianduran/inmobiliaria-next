import { DataGrid } from '@mui/x-data-grid';

function PagePersona({ dataTable }) {
  const tableCabecera = [
    { field: 'persona.documento', headerName: 'Identificación' },
    { field: 'persona.nombres', headerName: 'Nombres' },
    { field: 'persona.apellidos', headerName: 'Apellidos' },
    { field: 'persona.correo', headerName: 'Correo Electronico' },
    { field: 'actions', headerName: 'Actions' }
  ];

  return (
    <div 
      style={{ height: 400, width: '100%', backgroundColor: 'white' }}>
      <DataGrid
        columns={tableCabecera}
        rows={dataTable}
        hideFooter>
      </DataGrid>
    </div>
  )
}

export { PagePersona };