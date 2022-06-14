import {
  Container,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Stack,
  AlertTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Button,
  Alert,
  Typography,
  List,
  ListItem,
  Checkbox,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { useLocalStorage } from "@rehooks/local-storage";
import React, { useContext, useEffect, useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import { useRouter } from "next/router";
import PaymentIcon from "@mui/icons-material/Payment";
import OtpInput from "react-otp-input";
import { useUserAuth } from "../utils/useAuthContext";
import axios from "axios";
import { contextStore } from "../utils/Store";
export default function Checkout() {
  const [activeStep, setActiveStep] = useState();
  const [confirmation, setConfirmation] = useState(false);
  const [error, setError] = useState();
  const [otpError, setOtpError] = useState();
  const [show, setShow] = useState(false);
  const [showConfirmOrderBtn, setshowConfirmOrderBtn] = useState(false);
  const [otp, setOtp] = useState();
  const [confirmOtp, seCconfirmOtp] = useState();
  //shipping Info
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [country, setCountry] = useState();
  const [phone, setPhone] = useState();
  const [selectedPaymentM, setSelectedPaymentM] = useState();
  const { state, dispatch } = useContext(contextStore);
  const products = state.cart.cartItems;
  const { setUpRecaptcha } = useUserAuth();
  const router = useRouter();
  const [userInfo] = useLocalStorage("userInfo");
  const [cartInfo] = useLocalStorage("cartInfo");
  const [deliveryCharge] = useLocalStorage("deliveryCharge");
  //send opt
  const sendOtp = async (e) => {
    e.preventDefault();
    setShow(true);
    try {
      const res = await setUpRecaptcha(phone);
      seCconfirmOtp(res);
    } catch (error) {
      setOtpError(error.message);
    }
  };

  //pay by ssl
  const payBySsl = async () => {
    try {
      const { data } = await axios.post("/api/paybyssl", {
        shippingInfo: {
          address: address,
          city: city,
          country: country,
          phone: phone,
        },
        orderItems: cartInfo,
        user: userInfo._id,
        paymentMethod: "SSLCommerz Payment",
        paymentStatus: "Unpaid",
        shippingCharge: deliveryCharge,
        totalPrice:
          products.reduce((a, c) => a + c.price * c.qty, 0) + deliveryCharge,
      });
      dispatch({ type: "CLEAR_CART" });
      router.push(data);
    } catch (error) {
      setError(error.message);
    }
  };

  //verify otp
  const verifyOtp = async () => {
    try {
      await confirmOtp.confirm(otp);
      setshowConfirmOrderBtn(true);
    } catch (error) {
      setOtpError(error.message);
    }
  };
  //confirm order
  const confirmOrder = async () => {
    dispatch({ type: "CLEAR_CART" });
    try {
      await axios.post(
        "/api/order",
        {
          shippingInfo: {
            address: address,
            city: city,
            country: country,
            phone: phone,
          },
          orderItems: cartInfo,
          paymentMethod: "Cash on delivery",
          paymentStatus: "Unpaid",
          shippingCharge: deliveryCharge,
          totalPrice:
            products.reduce((a, c) => a + c.price * c.qty, 0) + deliveryCharge,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({ type: "CLEAR_CART" });
      router.push("/order-confirmation");
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (!userInfo || !cartInfo) {
      router.push("/");
    }
  });

  return (
    <Container
      sx={{
        marginTop: "20px",
        marginBottom: "20px",
        width: { xs: "100%", sm: "95%", md: "50%" },
      }}
    >
      <Paper
        variant="outlined"
        sx={{
          padding: { xs: "4px", sm: "6px", md: "10px" },
        }}
      >
        <div
          style={{
            display: show ? "none" : "block",
          }}
        >
          <Typography py={3} align="center" variant="outlined" component={"h1"}>
            Shipping and Billing
          </Typography>
          <Stepper activeStep={activeStep} orientation="vertical">
            <Step>
              <StepLabel>Shipping Info</StepLabel>
              <StepContent>
                <Stack spacing={2} p={1}>
                  <TextField
                    size="small"
                    id="outlined-basic"
                    color="secondary"
                    label="Address"
                    variant="outlined"
                    value={address}
                    placeholder="Type your address"
                    required
                    type={"text"}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <TextField
                    size="small"
                    color="secondary"
                    id="outlined-basic"
                    label="City"
                    type={"text"}
                    value={city}
                    variant="outlined"
                    placeholder="Type your city"
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small">Country</InputLabel>
                    <Select
                      size="small"
                      labelId="demo-select-small"
                      id="demo-select-small"
                      value={country}
                      color="secondary"
                      label="county"
                      onChange={(e) => setCountry(e.target.value)}
                    >
                      <MenuItem value={"Bangladesh"}>Bangladesh</MenuItem>
                      <MenuItem value={"India"}>India</MenuItem>
                      <MenuItem value={"China"}>China</MenuItem>
                    </Select>
                  </FormControl>
                  <PhoneInput
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={setPhone}
                    defaultCountry="BD"
                    international
                    countryCallingCodeEditable={false}
                  />

                  <Button
                    disabled={!address || !city || !country || !phone}
                    onClick={() => setActiveStep(1)}
                    sx={{ background: "#FFDA00", color: "#000000" }}
                    variant="outlined"
                    type="button"
                  >
                    Next
                  </Button>
                </Stack>
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Payment Method</StepLabel>
              <StepContent>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small">Payment Method</InputLabel>
                  <Select
                    size="small"
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={selectedPaymentM}
                    color="secondary"
                    label="Payment Method"
                    onChange={(e) => setSelectedPaymentM(e.target.value)}
                  >
                    <MenuItem value={"cod"}>Cash on Delivery</MenuItem>
                    <MenuItem value={"ssl"}>SSL Payment</MenuItem>
                  </Select>
                </FormControl>

                <Typography
                  sx={{
                    display: selectedPaymentM ? "block" : "none",
                    color: "green",
                  }}
                >
                  You have selected{" "}
                  {selectedPaymentM === "ssl"
                    ? "SSL Payment Method"
                    : "Cash on Delivery Method"}
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Button
                    onClick={() => setActiveStep(0)}
                    sx={{ background: "#FFDA00", color: "#000000" }}
                    variant="outlined"
                    type="b"
                  >
                    Back
                  </Button>
                  <Button
                    disabled={!selectedPaymentM}
                    onClick={() => setActiveStep(2)}
                    sx={{ background: "#FFDA00", color: "#000000" }}
                    variant="outlined"
                    type="button"
                  >
                    Next
                  </Button>
                </Stack>
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Review and Confirm</StepLabel>
              <StepContent>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <HomeIcon></HomeIcon>
                    </ListItemIcon>
                    <ListItemText>
                      {`${address},  ${city},  ${country}`}
                    </ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <PhoneIcon></PhoneIcon>
                    </ListItemIcon>
                    <ListItemText>{phone}</ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <PaymentIcon></PaymentIcon>
                    </ListItemIcon>
                    <ListItemText>
                      {selectedPaymentM === "ssl"
                        ? "SSL Payment Method"
                        : "Cash on Delivery Method"}
                    </ListItemText>
                  </ListItem>
                  <ListItem>
                    <Alert severity="warning" variant="outlined">
                      <AlertTitle>Warning</AlertTitle>
                      <Checkbox
                        checked={confirmation}
                        onChange={(event) =>
                          setConfirmation(event.target.checked)
                        }
                      />{" "}
                      After clicking —{" "}
                      <strong>
                        {selectedPaymentM === "ssl"
                          ? "Checkout Now"
                          : "Send OTP"}{" "}
                        button{" "}
                      </strong>
                      {`you can't back again!`}
                    </Alert>
                  </ListItem>
                </List>

                <Stack direction="row" spacing={1}>
                  <Button
                    onClick={() => setActiveStep(1)}
                    sx={{ background: "#FFDA00", color: "#000000" }}
                    variant="outlined"
                    type="button"
                  >
                    Back
                  </Button>
                  {selectedPaymentM === "ssl" ? (
                    <Button
                      sx={{ background: "#FFDA00", color: "#000000" }}
                      variant="outlined"
                      type="button"
                      disabled={!confirmation}
                      onClick={payBySsl}
                    >
                      Checkout Now
                    </Button>
                  ) : (
                    <Button
                      sx={{ background: "#FFDA00", color: "#000000" }}
                      variant="outlined"
                      type="button"
                      disabled={!confirmation}
                      onClick={sendOtp}
                    >
                      Send OTP
                    </Button>
                  )}
                </Stack>
              </StepContent>
            </Step>
          </Stepper>
        </div>
        <div style={{ display: show ? "block" : "none" }}>
          <div style={{ display: showConfirmOrderBtn ? "none" : "block" }}>
            <Stack spacing={2} alignItems="center" p={1}>
              <Typography variant="bold" component={"h2"} align="center">
                Phone Verification
              </Typography>
              <OtpInput
                inputStyle={{
                  border: "1px solid #ccc",
                  outline: "none",
                  borderRadius: "4px",
                }}
                value={otp}
                onChange={setOtp}
                numInputs={6}
                separator={<span>-</span>}
              />
              <Typography id="recaptcha-container"></Typography>
              <Typography sx={{ color: "red" }}>
                {otpError ? otpError : null}
              </Typography>
              <Button
                sx={{
                  background: "#FFDA00",
                  color: "#000000",
                  width: "50%",
                  margin: "auto",
                }}
                variant="outlined"
                type="button"
                disabled={!otp}
                onClick={verifyOtp}
              >
                Verify
              </Button>
            </Stack>
          </div>
        </div>
        <div style={{ display: showConfirmOrderBtn ? "block" : "none" }}>
          <Stack spacing={2} alignItems="center" p={1}>
            <Typography variant="bold" component={"h2"} align="center">
              Confirm Your Order
            </Typography>
            <Typography color="red">{error ? error : null}</Typography>
            <Button
              sx={{
                background: "#FFDA00",
                color: "#000000",
                width: "50%",
                margin: "auto",
              }}
              variant="outlined"
              type="button"
              onClick={confirmOrder}
            >
              Confirm
            </Button>
          </Stack>
        </div>
      </Paper>
    </Container>
  );
}
