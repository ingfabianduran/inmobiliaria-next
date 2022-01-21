import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

function Layout({ children }) {
  return (
    <React.Fragment>
      <Navbar></Navbar>
      <main>{ children }</main>
      <Footer></Footer>
    </React.Fragment>
  )
}

export { Layout };