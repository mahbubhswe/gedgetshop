import React from "react";
import ViewListIcon from "@mui/icons-material/ViewList";
import GroupIcon from "@mui/icons-material/Group";
import {
  Alert,
  AlertTitle,
  Box,
  IconButton,
  Paper,
  Stack,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BarChartIcon from "@mui/icons-material/BarChart";
import useSWR from "swr";
import axios from "axios";
import FadeLoader from "react-spinners/FadeLoader";
//total amount of sold items
const getDashboardInfo = (url) => axios.get(url).then((res) => res.data);
export default function AdminDefaultPage() {
  const { data, err } = useSWR("/api/admin/getDashboardInfo", getDashboardInfo);
  if (!data) {
    return (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "grid",
          placeContent: "center",
        }}
      >
        <FadeLoader></FadeLoader>
      </div>
    );
  }

  return (
    <Paper sx={{ padding: "20px", height: "100vh" }}>
      <Stack spacing={10} sx={{ paddingY: "80px" }}>
        <Stack direction={"row"} spacing={3}>
          <Box square width={"33%"}>
            <Alert severity="success" sx={{ background: "#E5F6FD" }}>
              <AlertTitle>Total Sales</AlertTitle>
              <IconButton>
                <AttachMoneyIcon fontSize="large"></AttachMoneyIcon>
                {data ? data.amount : 0}
              </IconButton>
            </Alert>
          </Box>

          <Box square width={"33%"}>
            <Alert severity="info">
              <AlertTitle>Total Order</AlertTitle>
              <IconButton>
                <ViewListIcon fontSize="large"></ViewListIcon>
                {data ? data.totalOrder : 0}
              </IconButton>
            </Alert>
          </Box>
          <Box square width={"33%"}>
            <Alert severity="info">
              <AlertTitle>New Orders</AlertTitle>
              <IconButton>
                <GroupIcon fontSize="large"></GroupIcon>
                {data ? data.newOrder : 0}
              </IconButton>
            </Alert>
          </Box>
        </Stack>
        <Stack direction={"row"} spacing={3}>
          <Box square width={"70%"}>
            <Alert severity="info" sx={{ padding: "50px" }}>
              <AlertTitle>Sales on this month</AlertTitle>
              <IconButton>
                <BarChartIcon fontSize="large"></BarChartIcon>
                {0}
              </IconButton>
            </Alert>
          </Box>
          <Box square width={"30%"}>
            <Alert severity="info" sx={{ padding: "50px" }}>
              <AlertTitle>Cusetomers</AlertTitle>
              <IconButton>
                <GroupIcon fontSize="large"></GroupIcon>
                {data ? data.numOfCus : 0}
              </IconButton>
            </Alert>
          </Box>
        </Stack>
      </Stack>
    </Paper>
  );
}
