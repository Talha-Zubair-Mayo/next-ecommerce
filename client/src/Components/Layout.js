import React from "react";
import { useSelector } from "react-redux";
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
  const CartItems = useSelector((state) => state?.CartItems?.cartItems?.length);
  return (
    <div>
      <Head>
        <title>{title ? title : "Ecommerce Site"}</title>
        {title && <meta name="description" content={description} />}
        {description ? <meta name="description" content={description} /> : null}
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
              <Badge
                color="secondary"
                overlap="circular"
                badgeContent={CartItems}>
                <Link>
                  <IconButton>
                    <i className="bx bx-cart"></i>
                  </IconButton>
                </Link>
              </Badge>
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
