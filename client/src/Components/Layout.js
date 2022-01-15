import React, { useEffect, useState } from "react";
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
  const [Total, setTotal] = useState("");
  const CartItems = useSelector((state) => state?.CartItems.cartItems);
  useEffect(() => {
    setTotal(CartItems.length);
  }, [CartItems]);
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
              <Badge color="secondary" overlap="circular" badgeContent={Total}>
                <Link>
                  <IconButton>
                    <i className="bx bx-cart"></i>
                  </IconButton>
                </Link>
              </Badge>
            </NextLink>
            <NextLink href="/login">
              <a
                style={{
                  textAlign: "center",
                  paddingTop: "10px",
                }}>
                Login
              </a>
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
