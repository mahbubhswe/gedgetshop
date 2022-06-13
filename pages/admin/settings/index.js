import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Admin from "..";
import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import { contextStore } from "../../../utils/Store";
import axios from "axios";
import PasswordIcon from "@mui/icons-material/Password";
export default function Settings() {
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState();
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmNewPassword, setConfirmNewPassword] = useState();
  const { state, dispatch } = useContext(contextStore);
  const { userInfo } = state;
  const router = useRouter();
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
    <Admin pageTitle={"Settings"}>
      <Paper sx={{ padding: "10px" }}>
        <List>
          <ListItem>
            <ListItemButton sx={{ color: "red" }} onClick={() => setOpen(true)}>
              <IconButton>
                <PasswordIcon></PasswordIcon>
              </IconButton>
              <ListItemText>Change Password</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Paper>
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
    </Admin>
  );
}
