import {
  Container,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  IconButton,
  Typography,
  Alert,
  AlertTitle,
  ListItem,
  ListItemText,
  Divider,
  Button,
  List,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { writeStorage } from "@rehooks/local-storage";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useContext } from "react";
import Image from "next/image";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { contextStore } from "../utils/Store";
import dynamic from "next/dynamic";
function Cart() {
  const [deliveryCharcg, setDeliveryCharge] = useState(0);
  const { state, dispatch } = useContext(contextStore);
  const router = useRouter();
  const products = state.cart.cartItems;
  const { userInfo } = state;
  const deliveryCharge = (charge) => {
    writeStorage("deliveryCharge", charge);
    setDeliveryCharge(charge);
  };
  const cartToCheckout = () => {
    if (userInfo) {
      router.push("/checkout");
    } else {
      router.push("/login");
    }
  };
  if (products.length < 1) {
    return (
      <Container sx={{ marginTop: "25px" }}>
        <Alert severity="info">
          <AlertTitle>Info</AlertTitle>
          Sorry, your cart is empty. Please,
          <strong>
            <Link href={"/"} passHref>
              <a> Go to shopping</a>
            </Link>
          </strong>
        </Alert>
      </Container>
    );
  }
  return (
    <Container>
      <Grid container spacing={2} my={5}>
        <Grid item sx={{ width: { xs: "100%", md: "70%" } }}>
          <Paper variant="outlined">
            <TableContainer>
              <Table>
                <TableHead sx={{ backgroundColor: "#ECECEE" }}>
                  <TableRow>
                    <TableCell>Img</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Qty</TableCell>
                    <TableCell>Remove</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products
                    ? products.map((product) => (
                        <TableRow key={product._id}>
                          <TableCell>
                            <Image
                              src={product.img}
                              alt={product.name}
                              height={50}
                              width={50}
                              quantity={100}
                            />
                          </TableCell>
                          <TableCell>{product.name}</TableCell>
                          <TableCell>{product.price}</TableCell>
                          <TableCell>
                            <IconButton
                              onClick={() =>
                                dispatch({
                                  type: "CART_MINUS",
                                  payload: product,
                                })
                              }
                            >
                              <RemoveCircleOutlineIcon></RemoveCircleOutlineIcon>
                            </IconButton>

                            {product.qty}

                            <IconButton
                              onClick={() =>
                                dispatch({
                                  type: "CART_PLUS",
                                  payload: product,
                                })
                              }
                            >
                              <AddCircleOutlineIcon></AddCircleOutlineIcon>
                            </IconButton>
                          </TableCell>
                          <TableCell>
                            <IconButton
                              onClick={() =>
                                dispatch({
                                  type: "REMOVE_ITEM",
                                  payload: product,
                                })
                              }
                            >
                              <RemoveShoppingCartIcon></RemoveShoppingCartIcon>
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    : null}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        <Grid item sx={{ width: { xs: "100%", md: "30%" } }}>
          <Paper sx={{ padding: "10px" }} variant="outlined">
            <List dense={true}>
              <ListItem>
                <ListItemText>
                  <strong>Price:</strong>{" "}
                  {products.reduce((a, c) => a + c.price * c.qty, 0)}
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small">
                      Delivery Charge
                    </InputLabel>
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      value={deliveryCharcg}
                      label="Delivery Charge"
                      onChange={(e) => deliveryCharge(e.target.value)}
                    >
                      <MenuItem value={0}>
                        <em>Please select</em>
                      </MenuItem>
                      <MenuItem value={50}>Dhanmondi(50)</MenuItem>
                      <MenuItem value={60}>Mirpur(60)</MenuItem>
                      <MenuItem value={70}>New Market(70)</MenuItem>
                      <MenuItem value={50}>Rampura(50)</MenuItem>
                      <MenuItem value={70}>Out side of dhaka(100)</MenuItem>
                    </Select>
                  </FormControl>
                </ListItemText>
              </ListItem>

              <Divider></Divider>
              <ListItem>
                <ListItemText>
                  <strong>Total:</strong>{" "}
                  {products.reduce((a, c) => a + c.price * c.qty, 0) +
                    deliveryCharcg}
                </ListItemText>
              </ListItem>
              <ListItem>
                <Button
                  disabled={deliveryCharcg ? false : true}
                  sx={{ background: "#FFDA00", color: "#000000" }}
                  fullWidth
                  variant="outlined"
                  onClick={cartToCheckout}
                >
                  Checkout
                </Button>
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
export default dynamic(() => Promise.resolve(Cart), {
  ssr: false,
});
