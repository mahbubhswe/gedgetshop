import { Box } from "@mui/material";
import React from "react";
import ProductShowing from "../components/ProductShowing";
export default function Feed() {
  return (
    <Box flex={1} padding={"20px"} >
      <ProductShowing></ProductShowing>
    </Box>
  );
}
