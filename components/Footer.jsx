import React from "react";

export default function Footer() {
  const date = new Date();
  const currentYear = date.getFullYear();

  return (
    <div style={{ background: "#F5F5F7" ,padding:"10px",textAlign:"center"}}>
      Copyright © {currentYear} Online Getget Shop. All rights reserved.
    </div>
  );
}
