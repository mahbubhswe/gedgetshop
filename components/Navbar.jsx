import React, { useContext, useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  Box,
  TextField,
  Stack,
  Badge,
  Avatar,
  ListItem,
  Button,
} from "@mui/material";
import { useRouter } from "next/router";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { contextStore } from "../utils/Store";
import Link from "next/link";
import dynamic from "next/dynamic";
import NavItems from "./NavItems";
function Navbar() {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState();
  const { state } = useContext(contextStore);
  const cartQty = state.cart.cartItems.length;
  const { userInfo } = state;
  const router = useRouter();
  const searchHandler = (e) => {
    e.preventDefault();
    router.push(`/search?str=${search}`);
  };

  return (
    <>
      <Box sx={{ height: "100px", lineHeight: "100px" }}>
        <Stack direction={"row"} spacing={3}>
          <Box>
            <Typography
              variant="bold"
              component={"span"}
              sx={{
                fontSize: "35px",
                display: { xs: "none", sm: "none", md: "block" },
                paddingLeft: "60px",
                textShadow: "2px 3px",
              }}
              color="black"
            >
              <span style={{ color: "#FDAF0F" }}>GADGET</span>SHOP
            </Typography>
          </Box>
          <Box
            flex={1}
            sx={{
              display: "grid",
              placeContent: "center",
              width: "100%",
              height: "100px",
              lineHeight: "100%",
            }}
          >
            <form onSubmit={searchHandler}>
              <Stack direction={"row"}>
                <TextField
                  color="secondary"
                  sx={{ width: { xs: "250px", sm: "350px", md: "500px" } }}
                  variant="outlined"
                  size="small"
                  value={search}
                  label={"Search your products..."}
                  placeholder={"Search by product name"}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <Button
                  variant="outlined"
                  type="submit"
                  sx={{ background: "#FFDA00", color: "#000000" }}
                >
                  Search
                </Button>
              </Stack>
            </form>
          </Box>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <IconButton>
              <Link href={"/your-cart"} passHref>
                <a>
                  <Badge badgeContent={cartQty} color="secondary" showZero>
                    <ShoppingCartIcon
                      sx={{ color: "gray" }}
                      fontSize="large"
                    ></ShoppingCartIcon>
                  </Badge>
                </a>
              </Link>
            </IconButton>
            <IconButton>
              {userInfo ? (
                <Link href={"/your-profile"} passHref>
                  <a>
                    <AccountCircleIcon
                      sx={{ color: "gray" }}
                      fontSize="large"
                    ></AccountCircleIcon>
                  </a>
                </Link>
              ) : (
                <Link href={"/login"} passHref>
                  <a>
                    <LoginIcon
                      sx={{ color: "gray" }}
                      fontSize="large"
                    ></LoginIcon>
                  </a>
                </Link>
              )}
            </IconButton>
          </Box>
        </Stack>
      </Box>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "#CB5455",
          boxShadow: "none",
          borderBottom: "3px solid #FFDA00",
        }}
      >
        <Toolbar>
          <IconButton
            onClick={() => setShow(!show)}
            sx={{
              display: { xs: "block", sm: "block", md: "none", lg: "none" },
            }}
          >
            <MenuIcon></MenuIcon>
          </IconButton>
          <NavItems></NavItems>

          <Typography
            variant="bold"
            component={"span"}
            sx={{
              fontSize: "23px",
              display: { sm: "block", md: "none" },
              paddingLeft: "60px",
              textShadow: "1px 2px",
            }}
            color="black"
          >
            <span style={{ color: "#FDAF0F" }}>GADGET</span>SHOP
          </Typography>
          <Box sx={{ display: { xs: "bloc", sm: "none", marginLeft: "auto" } }}>
            <IconButton>
              <Link href={"/your-cart"} passHref>
                <a>
                  <Badge badgeContent={cartQty} color="secondary" showZero>
                    <ShoppingCartIcon
                      sx={{ color: "white" }}
                      fontSize="dedium"
                    ></ShoppingCartIcon>
                  </Badge>
                </a>
              </Link>
            </IconButton>
            <IconButton>
              {userInfo ? (
                <Link href={"/your-profile"} passHref>
                  <a>
                    <AccountCircleIcon
                      sx={{ color: "white" }}
                      fontSize="dedium"
                    ></AccountCircleIcon>
                  </a>
                </Link>
              ) : (
                <Link href={"/login"} passHref>
                  <a>
                    <LoginIcon
                      sx={{ color: "white" }}
                      fontSize="dedium"
                    ></LoginIcon>
                  </a>
                </Link>
              )}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer open={show} onClose={() => setShow(false)}>
        <List sx={{ width: "200px" }}>
          <ListItem>
            <Link href={"/"} passHref>
              <a
                style={{
                  textDecoration: "none",
                  color: router.asPath === "/" ? "#000000" : "gray",
                }}
              >
                HOME
              </a>
            </Link>
          </ListItem>
          <ListItem>
            <Link href={"/products/mobile"} passHref>
              <a
                style={{
                  textDecoration: "none",
                  color:
                    router.asPath === "/products/mobile" ? "#000000" : "gray",
                }}
              >
                MOBILE
              </a>
            </Link>
          </ListItem>
          <ListItem>
            <Link href={"/products/desktop"} passHref>
              <a
                style={{
                  textDecoration: "none",
                  color:
                    router.asPath === "/products/desktop" ? "#000000" : "gray",
                }}
              >
                DESKTOP
              </a>
            </Link>
          </ListItem>
          <ListItem>
            <Link href={"/products/laptop"} passHref>
              <a
                style={{
                  textDecoration: "none",
                  color:
                    router.asPath === "/products/laptop" ? "#000000" : "gray",
                }}
              >
                LAPTOP
              </a>
            </Link>
          </ListItem>
          <ListItem>
            <Link href={"/products/accessory"} passHref>
              <a
                style={{
                  textDecoration: "none",
                  color:
                    router.asPath === "/products/accessory"
                      ? "#000000"
                      : "gray",
                }}
              >
                ACCESSORY
              </a>
            </Link>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

export default dynamic(() => Promise.resolve(Navbar), {
  ssr: false,
});
