import Head from "next/head";
import React from "react";
import Navbar from "./Navbar";
import Footer from "../components/Footer";
import MessengerCustomerChat from "react-messenger-customer-chat";

export default function Layout({ pageTitle, children }) {
  return (
    <>
      <Head>
        <title>{pageTitle ? pageTitle : "Walcome to online getget shop"}</title>
      </Head>
      <Navbar></Navbar>
      <main>{children}</main>
     
      <MessengerCustomerChat
        pageId="103070385764123"
        appId="411472610987693"
        htmlRef="<REF_STRING>"
      />
    </>
  );
}
