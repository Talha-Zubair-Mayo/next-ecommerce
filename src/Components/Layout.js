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
import useStyles from "../../utils/JssStyles";

const Layout = ({ children }) => {
  const classes = useStyles();
  return (
    <div>
      <Head>
        <title>Ecommerce Site</title>
      </Head>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          <Typography>My Web</Typography>
        </Toolbar>
      </AppBar>
      <Container className={classes.main}>{children}</Container>
      <footer className={classes.footer}>
        <Typography>Talha , All Rights Reserved</Typography>
      </footer>
    </div>
  );
};

export default Layout;
