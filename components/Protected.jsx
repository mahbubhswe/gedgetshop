import React from "react";
import Login from "./Login";
import Layout from "./Layout";
import { useLocalStorage } from "@rehooks/local-storage";
export default function Protected({ urlPath, children }) {
  const [userInfo] = useLocalStorage("userInfo");
  if (userInfo) {
    return <Layout>{children}</Layout>;
  } else {
    return <Login urlPath={urlPath}>{children}</Login>;
  }
}
