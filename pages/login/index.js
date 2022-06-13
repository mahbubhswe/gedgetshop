import React from "react";
import Login from "../../components/Login";
import UserProfile from "../../components/UserProfile";

export default function Index() {
  return <Login urlPath={"/your-profile"}><UserProfile></UserProfile></Login>;
}
