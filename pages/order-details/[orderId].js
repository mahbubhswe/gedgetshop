import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import Image from "next/image";
import CallIcon from "@mui/icons-material/Call";
import FadeLoader from "react-spinners/FadeLoader";
import HomeIcon from "@mui/icons-material/Home";
import LiveOrderTracking from "../../components/LiveOrderTracking";
import { useRouter } from "next/router";
export default function OrderId({ order }) {
  const [myOrder, setMyOrder] = useState(order);
  const router = useRouter();
  const deleteOrder = async () => {
    await axios.delete(`/api/order/deleteOrder?id=${myOrder._id}`);
    router.push("/your-profile");
  };
  return (
    <Container sx={{ margin: "30px" }}>
      {myOrder ? (
        <Stack spacing={2}>
          <LiveOrderTracking
            orderId={myOrder._id}
            activeStep={
              myOrder.orderStatus === "Processing"
                ? 0
                : myOrder.orderStatus === "On the way"
                ? 1
                : 3
            }
          ></LiveOrderTracking>

          <Paper variant="outlined" sx={{ padding: "10px" }}>
            <Typography
              sx={{ fontSize: "30px", color: "gray", fontWeight: 700 }}
            >
              Product Information
            </Typography>
            <TableContainer>
              <Table>
                <TableHead sx={{ backgroundColor: "#ECECEE" }}>
                  <TableRow>
                    <TableCell>Img</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Qty</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {myOrder.orderItems
                    ? myOrder.orderItems.map((product) => (
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
                          <TableCell>{product.qty}</TableCell>
                        </TableRow>
                      ))
                    : null}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          <Paper variant="outlined" sx={{ padding: "10px" }}>
            <Typography
              sx={{ fontSize: "30px", color: "gray", fontWeight: 700 }}
            >
              Shipping Information
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <HomeIcon></HomeIcon>
                </ListItemIcon>
                <ListItemText>
                  {myOrder.shippingInfo.address +
                    ", " +
                    myOrder.shippingInfo.address +
                    ", " +
                    myOrder.shippingInfo.address}
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CallIcon></CallIcon>
                </ListItemIcon>
                <ListItemText>{myOrder.shippingInfo.phone}</ListItemText>
              </ListItem>
            </List>
          </Paper>
          <Paper variant="outlined" sx={{ padding: "10px" }}>
            <Typography
              sx={{ fontSize: "30px", color: "gray", fontWeight: 700 }}
            >
              Order Information
            </Typography>
            <List>
              <ListItem>
                <ListItemText>
                  <strong>Payment Method: </strong>
                  {myOrder.paymentMethod === "ssl"
                    ? "SSLCOMMERZ"
                    : "Cash on Delivery"}
                </ListItemText>
              </ListItem>

              <ListItem>
                <ListItemText>
                  <strong>Payment Status: </strong>
                  {myOrder.paymentStatus}
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  <strong>Order Status: </strong>
                  {myOrder.orderStatus}
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  <strong>Shipping Charge: </strong>
                  {myOrder.shippingCharge} tk
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  <strong>Price: </strong>
                  {myOrder.totalPrice} tk
                </ListItemText>
              </ListItem>
              <ListItem>
                <Button
                  sx={{
                    color: "red",
                  }}
                  onClick={deleteOrder}
                  disabled={myOrder.orderStatus === "Processing" ? false : true}
                >
                  Cancle Order
                </Button>
              </ListItem>
            </List>
          </Paper>
        </Stack>
      ) : (
        <FadeLoader size={50}></FadeLoader>
      )}
    </Container>
  );
}

export async function getServerSideProps(context) {
  const { orderId } = context.query;
  const { data } = await axios.get(
    `${process.env.url}/api/my-orders/order?id=${orderId}`
  );

  return { props: { order: data } };
}
