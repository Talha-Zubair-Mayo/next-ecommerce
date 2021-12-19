import React from "react";
import { useRouter } from "next/router";
import { AllProducts } from "../../utils/AllProducts";
import Layout from "../../src/components/Layout";

const ProductScreen = ({ productDetails }) => {
  return <Layout title={productDetails.title}>{productDetails.title}</Layout>;
};

export default ProductScreen;

ProductScreen.getInitialProps = async ({ query }) => {
  const productDetails = AllProducts.find(
    (product) => product.uuid === query.slug
  );
  return { productDetails: productDetails };
};
