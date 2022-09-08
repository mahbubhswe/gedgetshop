import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Button,
  DialogContent,
  TextField,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EmailIcon from "@mui/icons-material/Email";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import PasswordIcon from "@mui/icons-material/Password";
import { useRouter } from "next/router";
import { contextStore } from "../utils/Store";
import axios from "axios";
import Link from "next/link";
import DashboardIcon from "@mui/icons-material/Dashboard";
export default function ProfileInfo() {
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState();
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmNewPassword, setConfirmNewPassword] = useState();
  const { state, dispatch } = useContext(contextStore);
  const { userInfo } = state;
  const router = useRouter();
  //logout
  const userLogOut = () => {
    if (confirm("Are you sure want to log out?") === true) {
      try {
        dispatch({ type: "USER_LOGOUT" });
        router.push("/");
      } catch (error) {
        console.log(error.message);
      }
    }
  };
  //delete user account
  const deleteUserAccount = async (id) => {
    if (confirm("Are you sure you want to delete this account?") === true) {
      await axios.delete(`/api/user/deleteUserAccount?id=${id}`);
      dispatch({ type: "USER_LOGOUT" });
      router.push("/");
    }
  };
  //change password
  const handelSubmit = async (e) => {
    e.preventDefault();

    if (
      newPassword.length < 6 ||
      newPassword.localeCompare(confirmNewPassword) != 0
    ) {
      if (newPassword.length < 6) {
        setMsg("Password should be at last 6 charecters long");
      } else {
        setErr("Confirm password not matched with the new password");
      }
    } else {
      const { data } = await axios.post(`/api/changePassword`, {
        email: userInfo.email,
        oldPassword: oldPassword,
        newPassword: newPassword,
      });

      if (data) {
        dispatch({ type: "USER_LOGOUT" });
        router.push("/");
      }
    }
  };
  return (
    <Paper variant="outline">
      <List>
        {userInfo.isAdmin && (
          <ListItem>
            <ListItemIcon>
              <DashboardIcon></DashboardIcon>
            </ListItemIcon>
            <ListItemText>
              <Link href={"/admin"} passHref>
                <a style={{ textDecoration: "none", color: "green" }}>
                  Admin Dashboard
                </a>
              </Link>
            </ListItemText>
          </ListItem>
        )}

        <ListItem>
          <ListItemIcon>
            <AccountCircleIcon></AccountCircleIcon>
          </ListItemIcon>
          <ListItemText>Name: {userInfo.name}</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <EmailIcon></EmailIcon>
          </ListItemIcon>
          <ListItemText>Email: {userInfo.email}</ListItemText>
        </ListItem>
        <ListItemButton onClick={() => setOpen(true)}>
          <ListItemIcon>
            <PasswordIcon></PasswordIcon>
          </ListItemIcon>
          <ListItemText>Change Password</ListItemText>
        </ListItemButton>
        <ListItemButton onClick={() => userLogOut()}>
          <ListItemIcon sx={{ color: "#DB4040" }}>
            <LogoutIcon></LogoutIcon>
          </ListItemIcon>
          <ListItemText sx={{ color: "#DB4040" }}>Log out</ListItemText>
        </ListItemButton>
        <ListItemButton onClick={() => deleteUserAccount(userInfo._id)}>
          <ListItemIcon sx={{ color: "red" }}>
            <DeleteIcon></DeleteIcon>
          </ListItemIcon>
          <ListItemText sx={{ color: "red" }}>Delete My Account</ListItemText>
        </ListItemButton>
      </List>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        sx={{ padding: "15px" }}
      >
        <form onSubmit={handelSubmit}>
          <DialogTitle>Change Password</DialogTitle>
          <DialogContent>
            <Stack spacing={2}>
              <Typography sx={{ color: "red" }}>{err ? err : null}</Typography>
              <TextField
                label="Old Password"
                variant="outlined"
                type="password"
                placeholder="Enter your old password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
              <TextField
                label="New Password"
                variant="outlined"
                value={newPassword}
                type="password"
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter your new password"
                required
              />
              <TextField
                label="New Password"
                variant="outlined"
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                placeholder="Enter your new password"
                required
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button
              type="button"
              onClick={() => setOpen(false)}
              variant="outlined"
              sx={{ color: "red" }}
            >
              Cancle
            </Button>
            <Button type="submit" variant="outlined">
              Change Password
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Paper>
  );
}
