import {
  Button,
  Container,
  Stack,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import React from "react";

export default function LiveOrderTracking({ orderId, activeStep }) {
  return (
    <Container sx={{ marginBottom: "30px" }}>
      <Stack spacing={3}>
        <Typography component={"h3"}>
          <strong>Order ID: </strong>
          {orderId ? orderId : null}
        </Typography>
        <Typography
          sx={{ fontSize: "30px", color: "gray", fontWeight: 700 }}
          align="center"
        >
          Order Live Tracking
        </Typography>
        <Stepper activeStep={activeStep ? activeStep : 0}>
          <Step>
            <StepLabel>Processing</StepLabel>
          </Step>
          <Step>
            <StepLabel>On the way</StepLabel>
          </Step>
          <Step>
            <StepLabel>Delivered</StepLabel>
          </Step>
        </Stepper>
      </Stack>
    </Container>
  );
}
