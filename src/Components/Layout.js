import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Container,
} from "@material-ui/core";
import Head from "next/head";
const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Ecommerce Site</title>
      </Head>
      <AppBar position="static">
        <Toolbar>
          <Typography>My Web</Typography>
        </Toolbar>
      </AppBar>
      <Container>{children}</Container>
      <footer>
        <Typography >Talha ,  All Rights Reserved</Typography>
      </footer>
    </div>
  );
};

export default Layout;
