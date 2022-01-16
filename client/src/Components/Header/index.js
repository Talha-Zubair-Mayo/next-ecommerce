import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import NextLink from "next/link";
import { Badge } from "@material-ui/core";
import { useSelector } from "react-redux";
const Header = () => {
  const [Total, setTotal] = useState("");
  const CartItems = useSelector((state) => state?.CartItems.cartItems);
  useEffect(() => {
    setTotal(CartItems.length);
  }, [CartItems]);
  return (
    <div id={styles.Main}>
      <div className={styles.Brand}>
        <NextLink href="/">
          <a>My Web</a>
        </NextLink>
      </div>
      <div className={styles.HeaderLeft}>
        <div className={styles.Nav}>
          <ul>
            <li className={styles.NavItem}>
              <NextLink href="/cart">
                <a>
                  <Badge
                    color="primary"
                    overlap="circular"
                    badgeContent={Total}>
                    <i id={styles.icons} className="bx bx-cart"></i>
                  </Badge>
                </a>
              </NextLink>
            </li>
            <li className={styles.NavItem}>
              <NextLink href="/login">
                <a href="">Login</a>
              </NextLink>
            </li>
            {/* <li className={styles.NavItem}>
              <NextLink href="">
                <a href="">Checkout</a>
              </NextLink>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
