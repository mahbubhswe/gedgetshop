import React from "react";
import Link from "next/link";
export default function index() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "grid",
        placeContent: "center",
        color: "green",
      }}
    >
      Order created successfully!
      <Link href={"/your-profile"} passHref>
        <a> Back to profile</a>
      </Link>
    </div>
  );
}
