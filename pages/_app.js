import { useState, useEffect } from 'react';
import { Layout } from '../components/Layout/Layout';
import { Loader } from '../components/Layout/Loader';
import { ThemeProvider } from '@mui/material/styles';
import { Theme } from '../themes/Theme';
import Router from 'next/router';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);
  useEffect(() => {
    Router.events.on('routeChangeStart', startLoading);
    Router.events.on('routeChangeComplete', stopLoading);
    Router.events.on('routeChangeError', stopLoading);
    return () => {
      Router.events.off('routeChangeStart', startLoading);
      Router.events.off('routeChangeComplete', stopLoading);
      Router.events.off('routeChangeError', stopLoading);
    }
  }, []);

  return (
    <ThemeProvider theme={Theme}>
      <Layout>
        <Loader
          loading={loading}>
        </Loader>
        <Component 
          {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default MyApp
