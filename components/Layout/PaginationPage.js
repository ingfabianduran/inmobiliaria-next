import React from 'react';
import { Stack, Pagination } from '@mui/material';
import { useRouter } from 'next/router';

function PaginationPage({ numPages, page, setPage, url }) {
  const router = useRouter();
  const getData = async(event, value) => {
    setPage(value);
    router.push(`${url}?page=${value}`);
  };
  return (
    <Stack
      sx={{ marginTop: 3, marginBottom: 3 }}
      spacing={2}>
      <Pagination
        page={page}
        variant='outlined'
        shape='rounded'
        sx={{ display: 'flex', justifyContent: 'center', }}
        color='primary'
        count={numPages}
        onChange={getData}>
      </Pagination>
    </Stack>
  )
}

export { PaginationPage };