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
const Home = () => (
  <>
    <Layout>
      <Grid container spacing={3}>
        {AllProducts.map((product, index) => (
          <Grid key={index} item md={4}>
            <Product productDetails={product} />
          </Grid>
        ))}
      </Grid>
    </Layout>
  </>
);

export default Home;
