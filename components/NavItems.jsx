import * as React from "react";
import Link from "next/link";
import { Stack, Tooltip } from "@mui/material";
import { useRouter } from "next/router";
export default function NavItems() {
  const router = useRouter();
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        display: { xs: "none", sm: "none", md: "block", lg: "block" },
      }}
    >
      <Link href={"/"} passHref>
        <a
          style={{
            textDecoration: "none",
            color: router.asPath === "/" ? "#000000" : "white",
          }}
        >
          HOME
        </a>
      </Link>

      <Link href={"/products/mobile"} passHref>
        <a
          style={{
            textDecoration: "none",
            color: router.asPath === "/products/mobile" ? "#000000" : "white",
          }}
        >
          MOBILE
        </a>
      </Link>

      <Link href={"/products/desktop"} passHref>
        <a
          style={{
            textDecoration: "none",
            color: router.asPath === "/products/desktop" ? "#000000" : "white",
          }}
        >
          DESKTOP
        </a>
      </Link>

      <Link href={"/products/laptop"} passHref>
        <a
          style={{
            textDecoration: "none",
            color: router.asPath === "/products/laptop" ? "#000000" : "white",
          }}
        >
          LAPTOP
        </a>
      </Link>
      <Link href={"/products/tablet"} passHref>
        <a
          style={{
            textDecoration: "none",
            color: router.asPath === "/products/tablet" ? "#000000" : "white",
          }}
        >
          TABLAT
        </a>
      </Link>
      <Link href={"/products/accessory"} passHref>
        <a
          style={{
            textDecoration: "none",
            color:
              router.asPath === "/products/accessory" ? "#000000" : "white",
          }}
        >
          ACCESSORY
        </a>
      </Link>
    </Stack>
  );
}
