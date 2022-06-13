import { Stack, Box, Typography } from "@mui/material";
import React from "react";
import { SocialIcon } from "react-social-icons";

export default function SocialMediaLink() {
  return (
    <Box>
      <Typography variant="bold" component={"h2"}>
        Follow Us
      </Typography>
      <Stack direction="row" spacing={2}>
        <SocialIcon
          data-aos="fade-up-right"
          data-aos-offset="0"
          data-aos-delay="50"
          data-aos-duration="400"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
          data-aos-once="false"
          data-aos-anchor-placement="top-center"
          url="https://twitter.com/"
        />
        <SocialIcon
          data-aos="fade-up-right"
          data-aos-offset="0"
          data-aos-delay="50"
          data-aos-duration="700"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
          data-aos-once="false"
          data-aos-anchor-placement="top-center"
          url="https://facebook.com/"
        />
        <SocialIcon
          data-aos="fade-up-right"
          data-aos-offset="0"
          data-aos-delay="50"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
          data-aos-once="false"
          data-aos-anchor-placement="top-center"
          url="https://youtube.com/"
        />
      </Stack>
    </Box>
  );
}
