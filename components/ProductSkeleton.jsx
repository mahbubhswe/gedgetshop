import React from "react";
import { Card, CardActions, Skeleton, Stack } from "@mui/material";
export default function Index({ product }) {
  return (
    <Stack direction={"row"} spacing={4} justifyContent={"center"}>
      <Card variant="outlined" sx={{ width: "280px",display:{xs:"none"} }}>
        <Skeleton
          variant="rectangular"
          animation="wave"
          width={280}
          height={300}
        />
        <div style={{ width: "98%", margin: "auto" }}>
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation={false} height={50} />
        </div>
      </Card>
      <Card variant="outlined" sx={{ width: "280px",display:{xs:"none"} }}>
        <Skeleton
          variant="rectangular"
          animation="wave"
          width={280}
          height={300}
        />
        <div style={{ width: "98%", margin: "auto" }}>
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation={false} height={50} />
        </div>
      </Card>
      <Card variant="outlined" sx={{ width: "280px" ,display:{sm:"none"}}}>
        <Skeleton
          variant="rectangular"
          animation="wave"
          width={280}
          height={300}
        />
        <div style={{ width: "98%", margin: "auto" }}>
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation={false} height={50} />
        </div>
      </Card>
    </Stack>
  );
}
