import Head from "next/head";
import Image from "next/image";
import Layout from "../src/components/Layout";
import { AllProducts } from "../utils/AllProducts";
import Product from "../src/components/Products";
import {
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@material-ui/core";
const Home = ({ ProductList }) => (
  <>
    <Layout>
      <Grid container spacing={3}>
        {ProductList.map((product, index) => (
          <Grid key={index} item md={4}>
            <Product productDetails={product} />
          </Grid>
        ))}
      </Grid>
    </Layout>
  </>
);

// Home.getInitialProps = async (ctx) => {
//   const res = await fetch("http://localhost:8080/api/products");
//   const json = await res.json();
//   return { ProductList: json };
// };
export async function getServerSideProps({ query }) {
  const res = await fetch(`http://localhost:8080/api/products`);
  const json = await res.json();
  return {
    props: { ProductList: json }, // will be passed to the page component as props
  };
}
export default Home;
