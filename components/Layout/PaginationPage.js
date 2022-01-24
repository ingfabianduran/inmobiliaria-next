import React from 'react';
import { Stack, Pagination } from '@mui/material';
import { useRouter } from 'next/router';

function PaginationPage({ numPages, url }) {
  const router = useRouter();
  const getData = async(event, value) => {
    router.push(`${url}?page=${value}`);
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