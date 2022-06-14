import Head from "next/head";
import React from "react";
import Navbar from "./Navbar";

export default function Layout({ pageTitle, children }) {
  return (
    <>
      <Head>
        <title>{pageTitle ? pageTitle : "Walcome to online getget shop"}</title>
      </Head>
      <Navbar></Navbar>
      <main>{children}</main>
     
    
    </>
  );
}
