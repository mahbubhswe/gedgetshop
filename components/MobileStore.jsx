import { Paper, Box,Typography } from "@mui/material";
import React from "react";
import MobileStoreButton from "react-mobile-store-button";
export default function MobileStore() {
  const androidUrl = "https://play.google.com/store/games";
  const iOSUrl = "https://itunes.apple.com/us/app";
  return (
    <Box>
      <Typography variant="bold" component={"h2"}>
        Download Mpbile App
      </Typography>
      <Paper sx={{padding:"10px"}}>
        <MobileStoreButton
          height={100}
          width={200}
          store="android"
          url={androidUrl}
          linkProps={{ title: "android Store Button" }}
        />
        <MobileStoreButton
          height={100}
          width={200}
          store="ios"
          url={iOSUrl}
          linkProps={{ title: "iOS Store Button" }}
        />
      </Paper>
    </Box>
  );
}
