import React from "react";
import styles from "./Product.module.css";
import Rating from "@mui/material/Rating";
const Product = ({ productDetails }) => {
  return (
    <div className={styles.product_card}>
      <div className={styles.logo_cart}>
        <i className="bx bxl-meta"></i> <i className="bx bx-shopping-bag"></i>
      </div>
      <div className={styles.main_images}>
        <img
          id="blue"
          className="blue active"
          src={productDetails.image}
          alt="blue"
        />
      </div>
      <div className={styles.shoe_details}>
        <span className="shoe_name">{productDetails.title}</span>
        <p>{productDetails.description}</p>
        <div className="stars">
          {" "}
          <Rating
            name="size-large"
            defaultValue={productDetails.rating.rate}
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
          <span className={styles.price_letter}>Nine dollar only</span>
        </div>
      </div>
      <div className={styles.button}>
        <div className={styles.button_layer}></div>
        <button>Add To Cart</button>
      </div>
    </div>
  );
};

export default Product;
