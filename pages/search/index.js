import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { Container, Grid, Typography } from "@mui/material";
import Head from "next/head";
import FadeLoader from "react-spinners/FadeLoader";
import ProductShowing from "../../components/ProductShowing";
import useSWR from "swr";
import Link from "next/link";
const getSearchResult = (url) => axios.get(url).then((res) => res.data);
export default function Search() {
  const router = useRouter();
  const { str } = router.query;

  const { data, error } = useSWR(`/api/search?str=${str}`, getSearchResult);

  if (!data)
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "grid",
          placeContent: "center",
        }}
      >
        <p>
          <FadeLoader></FadeLoader>
        </p>
      </div>
    );
  if (error) return <p style={{ color: "red" }}>{error.message}</p>;
  if (data.length === 0)
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "grid",
          placeContent: "center",
        }}
      >
        <p>Sorry, no such product found.</p>
        <Link href={"/"} passHref>
          <a>Back</a>
        </Link>
      </div>
    );

  return (
    <>
      <Head>
        <title>Product Searching</title>
      </Head>

      <Navbar></Navbar>
      <Container sx={{ marginY: "35px" }}>
        <Grid container spacing={3} justifyContent="center">
          {data.map((product) => (
            <ProductShowing
              key={product._id}
              product={product}
            ></ProductShowing>
          ))}
        </Grid>
      </Container>
    </>
  );
}
