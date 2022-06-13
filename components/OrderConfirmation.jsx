import { Container, Stack, Alert, AlertTitle } from "@mui/material";
import React from "react";
export default function ConfirmOrder() {
  return (
    <Container sx={{marginTop:"25px"}}>
     
        <Stack spacing={3}>
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            Your order hase been created successfully. —{" "}
            <strong>Thank you!</strong>
          </Alert>
        </Stack>
   
    </Container>
  );
}
