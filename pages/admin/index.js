import React, { useContext } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import HomeIcon from "@mui/icons-material/Home";
import ViewListIcon from "@mui/icons-material/ViewList";
import GroupIcon from "@mui/icons-material/Group";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AdminDefaultPage from "./AdminDefaultPage";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import useLocalStorage from "@rehooks/local-storage";
import { contextStore } from "../../utils/Store";
import Login from "../../components/Login";
import dynamic from "next/dynamic";
function Admin({ pageTitle, children }) {
  const { dispatch } = useContext(contextStore);
  const [userInfo] = useLocalStorage("userInfo");
  const { isAdmin } = userInfo ? userInfo : false;
  const router = useRouter();

  if (!isAdmin) {
    return <Login></Login>;
  }
  //logout
  const userLogOut = () => {
    if (confirm("Are you sure you want to log out?") === true) {
      try {
        dispatch({ type: "USER_LOGOUT" });
        router.push("/");
      } catch (error) {
        console.log(error.message);
      }
    }
  };
  return (
    <>
      <Head>
        <title>{pageTitle ? pageTitle : "Admin Dashboard"}</title>
      </Head>
      <Grid container>
        <Grid item sx={{ width: "250px" }}>
          <div style={{ position: "fixed" }}>
            <List>
              <ListItem>
                <Link href={"/admin"} passHref>
                  <a
                    style={{
                      textDecoration: "none",
                      color: "gray",
                      width: "100%",
                    }}
                  >
                    <ListItemButton
                      sx={{
                        background:
                          router.asPath === "/admin" ? "#CFD8DC" : null,
                        borderRadius: "7px",
                      }}
                    >
                      <ListItemIcon>
                        <HomeIcon></HomeIcon>
                      </ListItemIcon>
                      <ListItemText>Home</ListItemText>
                    </ListItemButton>
                  </a>
                </Link>
              </ListItem>
              <ListItem>
                <Link href={"/admin/add-product"} passHref>
                  <a
                    style={{
                      textDecoration: "none",
                      color: "gray",
                      width: "100%",
                    }}
                  >
                    <ListItemButton
                      sx={{
                        background:
                          router.asPath === "/admin/add-product"
                            ? "#CFD8DC"
                            : null,
                        borderRadius: "7px",
                      }}
                    >
                      <ListItemIcon>
                        <AddCircleIcon></AddCircleIcon>
                      </ListItemIcon>
                      <ListItemText>Add product</ListItemText>
                    </ListItemButton>
                  </a>
                </Link>
              </ListItem>
              <ListItem>
                <Link href={"/admin/manage-products"} passHref>
                  <a
                    style={{
                      textDecoration: "none",
                      color: "gray",
                      width: "100%",
                    }}
                  >
                    <ListItemButton
                      sx={{
                        background:
                          router.asPath === "/admin/manage-products"
                            ? "#CFD8DC"
                            : null,
                        borderRadius: "7px",
                      }}
                    >
                      <ListItemIcon>
                        <ViewListIcon></ViewListIcon>
                      </ListItemIcon>
                      <ListItemText>Manage</ListItemText>
                    </ListItemButton>
                  </a>
                </Link>
              </ListItem>

              <ListItem>
                <Link href={"/admin/manage-customers"} passHref>
                  <a
                    style={{
                      textDecoration: "none",
                      color: "gray",
                      width: "100%",
                    }}
                  >
                    <ListItemButton
                      sx={{
                        background:
                          router.asPath === "/admin/manage-customers"
                            ? "#CFD8DC"
                            : null,
                        borderRadius: "7px",
                      }}
                    >
                      <ListItemIcon>
                        <GroupIcon></GroupIcon>
                      </ListItemIcon>
                      <ListItemText>Customers</ListItemText>
                    </ListItemButton>
                  </a>
                </Link>
              </ListItem>
              <ListItem>
                <Link href={"/admin/manage-orders"} passHref>
                  <a
                    style={{
                      textDecoration: "none",
                      color: "gray",
                      width: "100%",
                    }}
                  >
                    <ListItemButton
                      sx={{
                        background:
                          router.asPath === "/admin/manage-orders"
                            ? "#CFD8DC"
                            : null,
                        borderRadius: "7px",
                      }}
                    >
                      <ListItemIcon>
                        <ListAltIcon></ListAltIcon>
                      </ListItemIcon>
                      <ListItemText>Orders</ListItemText>
                    </ListItemButton>
                  </a>
                </Link>
              </ListItem>
              <ListItem>
                <ListItemButton disabled>
                  <ListItemIcon>
                    <PersonIcon></PersonIcon>
                  </ListItemIcon>
                  <ListItemText>{userInfo.name}</ListItemText>
                </ListItemButton>
              </ListItem>

              <ListItem>
                <Link href={"/admin/settings"} passHref>
                  <a
                    style={{
                      textDecoration: "none",
                      color: "gray",
                      width: "100%",
                    }}
                  >
                    <ListItemButton
                      sx={{
                        background:
                          router.asPath === "/admin/settings"
                            ? "#CFD8DC"
                            : null,
                        borderRadius: "7px",
                      }}
                    >
                      <ListItemIcon>
                        <SettingsIcon></SettingsIcon>
                      </ListItemIcon>
                      <ListItemText>Settings</ListItemText>
                    </ListItemButton>
                  </a>
                </Link>
              </ListItem>
              <ListItem>
                <ListItemButton
                  onClick={userLogOut}
                  sx={{
                    color: "red",
                    borderRadius: "7px",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: "red",
                    }}
                  >
                    <LogoutIcon></LogoutIcon>
                  </ListItemIcon>
                  <ListItemText>Logout</ListItemText>
                </ListItemButton>
              </ListItem>
            </List>
          </div>
        </Grid>
        <Grid
          item
          sx={{
            flex: 1,
            background: "#CFD8DC",
            minHeight: "100vh",
          }}
        >
          {children ? children : <AdminDefaultPage />}
        </Grid>
      </Grid>
    </>
  );
}
export default dynamic(() => Promise.resolve(Admin), {
  ssr: false,
});
