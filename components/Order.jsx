import React, { useState, useEffect } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  IconButton,
  Tooltip,
} from "@mui/material";
import Link from "next/link";
import DetailsIcon from "@mui/icons-material/Details";
import axios from "axios";
import useLocalStorage from "@rehooks/local-storage";
import FadeLoader from "react-spinners/FadeLoader";
export default function Order() {
  const [myOrders, setMyOrders] = useState();
  const [userInfo] = useLocalStorage("userInfo");
  async function getMyOrders() {
    const { data } = await axios.get(`/api/my-orders?id=${userInfo._id}`, {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    });
    setMyOrders(data);
  }
  useEffect(() => {
    if (!myOrders) {
      getMyOrders();
    }
  });

  return (
    <Paper variant="outlined">
      {myOrders ? (
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: "#ECECEE" }}>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Payment</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {myOrders.map((x) => (
                <TableRow key={x._id}>
                  <TableCell>{x._id}</TableCell>
                  <TableCell>{x.paymentStatus}</TableCell>
                  <TableCell>{x.orderStatus}</TableCell>
                  <TableCell>
                    <Tooltip title="View Order Details">
                      <Link href={`/order-details/${x._id}`} passHref>
                        <a>
                          <IconButton>
                            <DetailsIcon></DetailsIcon>
                          </IconButton>
                        </a>
                      </Link>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div
          style={{ height: "350px", display: "grid", placeContent: "center" }}
        >
          <FadeLoader size={50} />
        </div>
      )}
    </Paper>
  );
}
