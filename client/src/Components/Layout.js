import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "./Header";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Container,
  Link,
  Badge,
} from "@material-ui/core";
import Head from "next/head";
import useStyles from "../../utils/JssStyles";
import NextLink from "next/link";
const Layout = ({ children, title, description }) => {
  const classes = useStyles();

  return (
    <div>
      <Head>
        <title>{title ? title : "Ecommerce Site"}</title>
        {title && <meta name="description" content={description} />}
        {description ? <meta name="description" content={description} /> : null}
      </Head>

      <Header />
      <Container className={classes.main}>{children}</Container>
      <footer className={classes.footer}>
        <Typography>Talha , All Rights Reserved</Typography>
      </footer>
    </div>
  );
};

export default Layout;
