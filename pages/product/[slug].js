import React from "react";
import { useRouter } from "next/router";
import { AllProducts } from "../../utils/AllProducts";
import Layout from "../../src/components/Layout";
import styles from "./ProductDetails.module.css";
import Rating from "@mui/material/Rating";
import NextLink from "next/link";

const ProductScreen = ({ productDetails }) => {
  return (
    <Layout
      title={productDetails.title}
      description={productDetails.description}>
      <div className="container">
        <div
          className="col-lg-10 border p-3  bg-white"
          id={styles.main_section}>
          <NextLink href="/">
            <a className="row  m-0 pl-3 pt-0 pb-3" id={styles.hedding}>
              Back to Home
            </a>
          </NextLink>
          <div className="row m-0">
            <div className="col-lg-4  pb-3" id={styles.left_side_product_box}>
              <img
                src={productDetails.image}
                height="450px"
                className="border p-3"
              />
            </div>
            <div className="col-lg-8">
              <div
                className=" border p-3 m-0"
                id={styles.right_side_pro_detail}>
                <div className="row">
                  <div className="col-lg-12">
                    <p className="m-0 p-0">{productDetails.title}</p>
                  </div>
                  <div className="col-lg-12">
                    <p className="m-0 p-0 " id={styles.price_pro}>
                      ${productDetails.price}
                    </p>
                    <hr className="p-0 m-0" />
                  </div>
                  <div className="col-lg-12 pt-2">
                    <h5>Product Description</h5>
                    <span>{productDetails.description}</span>
                    <hr className="m-0 pt-2 mt-2" />
                  </div>
                  <div className="col-lg-12">
                    <p id={styles.tag_section}>
                      <strong>Rating : </strong>
                      <Rating
                        name="size-large"
                        defaultValue={productDetails.rating.rate}
                        precision={0.5}
                      />{" "}
                      of ({productDetails.rating.count} Reviews)
                    </p>
                  </div>
                  {/* <div className="col-lg-12">
                    <h6>Quantity :</h6>
                    <input
                      type="number"
                      className="form-control text-center w-100"
                      value="1"
                    />
                  </div> */}
                  <div className="col-lg-12 mt-3">
                    <div className="row">
                      <div className="col-lg-6 pb-2">
                        <a href="#" className="btn btn-danger w-100">
                          Add To Cart
                        </a>
                      </div>
                      <div className="col-lg-6">
                        <a href="#" className="btn btn-success w-100">
                          Shop Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductScreen;

ProductScreen.getInitialProps = async ({ query }) => {
  const productDetails = AllProducts.find(
    (product) => product.uuid === query.slug
  );
  return { productDetails: productDetails };
};
