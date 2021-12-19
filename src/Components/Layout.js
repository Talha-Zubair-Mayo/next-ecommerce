import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Container,
  Link,
} from "@material-ui/core";
import Head from "next/head";
import useStyles from "../../utils/JssStyles";
import NextLink from "next/link";
const Layout = ({ children, title }) => {
  const classes = useStyles();
  return (
    <div>
      <Head>
        <title>{title ? title : "Ecommerce Site"}</title>
      </Head>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          <NextLink href="/">
            <Link>
              <Typography className={classes.Brand}>My Web</Typography>
            </Link>
          </NextLink>
          <div className={classes.FlexGrow}></div>
          <div className={classes.Links}>
            <NextLink href="/cart">
              <Link>
                <Typography>Cart</Typography>
              </Link>
            </NextLink>
            <NextLink href="/login">
              <Link>
                <Typography>Login</Typography>
              </Link>
            </NextLink>
          </div>
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
