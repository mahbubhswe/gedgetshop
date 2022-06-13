import React, { useState, useContext } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import {
  Container,
  Paper,
  Button,
  Stack,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import { contextStore } from "../utils/Store";
export default function ShippingAddress({ urlPath, children }) {
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [country, setCountry] = useState();
  const [phone, setPhone] = useState();
  const { dispatch } = useContext(contextStore);
  return (
    <Stack spacing={2} p={1}>
      <TextField
        size="small"
        id="outlined-basic"
        color="secondary"
        label="Address"
        variant="outlined"
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
    </Stack>
  );
}
