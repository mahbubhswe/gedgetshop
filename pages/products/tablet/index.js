import axios from "axios";
import React from "react";
import ProductLayout from "../../../components/ProductLayout";

export default function Index({ data }) {
  return <ProductLayout data={data}></ProductLayout>;
}

export async function getServerSideProps() {
  // Fetch data from external API
  const { data } = await axios.get(
    `${process.env.url}/api/products?category=tablat`
  );

  // Pass data to the page via props
  return { props: { data } };
}
