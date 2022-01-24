import React from 'react';
import { Stack, Pagination } from '@mui/material';
import { ENDPOINT } from '../../api/config';

function PaginationPage({ numPages, url, setData }) {
  const getData = async(event, value) => {
    const res = await fetch(`${ENDPOINT}${url}?page=${value}`);
    const { data } = res.json();
    setData(data);
  };

  return (
    <Stack
      sx={{ marginTop: 3, marginBottom: 3 }}
      spacing={2}>
      <Pagination
        sx={{ display: 'flex', justifyContent: 'center', }}
        color='primary'
        count={numPages}
        onChange={getData}>
      </Pagination>
    </Stack>
  )
}

export { PaginationPage };