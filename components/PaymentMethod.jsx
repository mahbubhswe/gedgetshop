import { Typography } from "@mui/material";
import React, { useState } from "react";

export default function PaymentMethod() {
  const [selectedPaymentM, setSelectedPaymentM] = useState();
  return (
    <>
      <input
        type="radio"
        id="caseonDelivery"
        name="spm"
        value="caseonDelivery"
        onChange={() => setSelectedPaymentM("cod")}
      />
      <label htmlFor="cod">Cash on Delivery</label>
      <input
        type="radio"
        id="ssl"
        name="spm"
        value="ssl"
        onChange={() => setSelectedPaymentM("ssl")}
      />
        <label htmlFor="ssl">SSL Payment</label>
      <Typography sx={{ display: selectedPaymentM ? "block" : "none",color:"green" }}>
        You have selected{" "}
        {selectedPaymentM === "ssl" ? "SSL Payment Method" : "Cash on Delivery Method"}
      </Typography>
    </>
  );
}
