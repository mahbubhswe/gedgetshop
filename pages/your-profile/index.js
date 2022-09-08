import React from "react";
import Protected from "../../components/Protected";
import UserProfile from "../../components/UserProfile";

export default function Index() {
  return (
    <Protected urlPath={"/your-profile"}>
      <UserProfile></UserProfile>
    </Protected>
  );
}
