import React from "react";
import styles from "./Product.module.css";
import Rating from "@mui/material/Rating";
import NextLink from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Redux/Actions/CartAction";
const Product = ({ productDetails }) => {
  const dispatch = useDispatch();
  const CartItems = useSelector((state) => state?.CartItems?.cartItems);

  const AddToCartHandler = async () => {
    const existItem = CartItems.find((x) => x._id === productDetails._id);
    if (existItem) {
      const qty = existItem.qty + 1;
      await dispatch(addToCart(productDetails, qty));
    } else {
      await dispatch(addToCart(productDetails, 1));
    }
  };
  return (
    <div className={styles.product_card}>
      <div className={styles.logo_cart}>
        <i className="bx bxl-meta"></i> <i className="bx bx-shopping-bag"></i>
      </div>
      <div className={styles.main_images}>
        <NextLink href={`/product/${productDetails.title}`}>
          <img
            id="blue"
            className="blue active"
            src={productDetails.image}
            alt="blue"
          />
        </NextLink>
      </div>

      <div className={styles.shoe_details}>
        <NextLink href={`/product/${productDetails._id}`}>
          <a className={styles.shoe_name}>{productDetails.title}</a>
        </NextLink>
        <p>{productDetails.description}</p>
        <div className="stars">
          <Rating
            readOnly
            name="size-large"
            defaultValue={productDetails.rating}
            precision={0.5}
          />
        </div>
      </div>
      <div className={styles.color_price}>
        <div className={styles.color_option}>
          <span className="color">Colour:</span>
          <div className={styles.circles}>
            <span className={styles.circle} id={styles.blue}></span>
            <span className={styles.circle} id={styles.pink}></span>
            <span className="circle yellow " id="yellow"></span>
          </div>
        </div>
        <div className={styles.price}>
          <span className={styles.price_num}>${productDetails.price}</span>
          {/* <span className={styles.price_letter}>Nine dollar only</span> */}
        </div>
      </div>
      <div className={styles.button}>
        <div className={styles.button_layer}></div>
        <button onClick={AddToCartHandler}>Add To Cart</button>
      </div>
    </div>
  );
};

export default Product;
