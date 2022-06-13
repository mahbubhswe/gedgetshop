import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import React from "react";
import Admin from "..";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import DetailsIcon from "@mui/icons-material/Details";
export default function ManageOrders({ orders }) {
  //delete order
  const deleteOrder = async (id) => {
    if (confirm("Want to delete this order?") === true) {
      const { data } = await axios.delete(
        `/api/admin/orders/deleteOrder?id=${id}`
      );
      alert(data);
      window.location.reload();
    }
  };

  //change order status
  const changeOrderStatus = async (value, id) => {
    if (confirm("Want to update order status?") === true) {
      try {
        const { data } = await axios.put(
          `/api/admin/orders/update-status/payment?_id=${id}`,
          {
            orderStatus: value,
          }
        );
        alert(data);
        window.location.reload();
      } catch (error) {
        alert(error.message);
      }
    }
  };
  //change payment status
  const changePaymentStatus = async (value, id) => {
    if (confirm("Want to update payment status?") === true) {
      try {
        const { data } = await axios.put(
          `/api/admin/orders/update-status/payment?_id=${id}`,
          {
            paymentStatus: value,
          }
        );
        alert(data);
        window.location.reload();
      } catch (error) {
        alert(error.message);
      }
    }
  };
  return (
    <Admin pageTitle={"Manage Orders"}>
      <TableContainer>
        <Table>
          <TableHead sx={{ background: "#0A1929" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Order ID</TableCell>
              <TableCell sx={{ color: "white" }}>Details</TableCell>
              <TableCell sx={{ color: "white" }}>Price</TableCell>
              <TableCell sx={{ color: "white" }}>Payment</TableCell>
              <TableCell sx={{ color: "white" }}>Status</TableCell>
              <TableCell sx={{ color: "white" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders
              ? orders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>{order._id}</TableCell>
                    <TableCell>
                      <Tooltip title="View Order Details">
                        <Link href={`/order-details/${order._id}`} passHref>
                          <a>
                            <IconButton>
                              <DetailsIcon></DetailsIcon>
                            </IconButton>
                          </a>
                        </Link>
                      </Tooltip>
                    </TableCell>
                    <TableCell>{order.totalPrice}</TableCell>
                    <TableCell>
                      <FormControl fullWidth>
                        <InputLabel> {order.paymentStatus}</InputLabel>
                        <Select
                          label="Paymnet"
                          onChange={(e) =>
                            changePaymentStatus(e.target.value, order._id)
                          }
                        >
                          <MenuItem value={"Paid"}>Paid</MenuItem>
                          <MenuItem value={"Unpaid"}>Unpaid</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>

                    <TableCell>
                      <FormControl fullWidth>
                        <InputLabel>{order.orderStatus}</InputLabel>
                        <Select
                          label="Status"
                          onChange={(e) =>
                            changeOrderStatus(e.target.value, order._id)
                          }
                        >
                          <MenuItem value={"Processing"}>Processing</MenuItem>
                          <MenuItem value={"On the way"}>On the way</MenuItem>
                          <MenuItem value={"Delivered"}>Delivered</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => deleteOrder(order._id)}>
                        <DeleteIcon></DeleteIcon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </Admin>
  );
}

export async function getServerSideProps() {
  const { data } = await axios.get(`${process.env.url}/api/admin/orders`);
  return { props: { orders: data } };
}
