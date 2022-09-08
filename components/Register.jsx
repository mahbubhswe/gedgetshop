import {
  Container,
  Paper,
  Button,
  Stack,
  TextField,
  Typography,
  LinearProgress,
} from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useContext } from "react";
import { contextStore } from "../utils/Store";
export default function SignUp() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const { dispatch } = useContext(contextStore);
  const [msg, setMsg] = useState();
  const [showLoading, setShowLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6 || confirmPassword.localeCompare(password) != 0) {
      if (password.length < 6) {
        setMsg("Password should be at last 6 charecters long");
      } else {
        setMsg("Password not matched with confirm password");
      }
    } else {
      e.target.reset();
      try {
        setShowLoading(true);
        const { data } = await axios.post("/api/user/registration", {
          name: name,
          email: email,
          password: password,
        });
        dispatch({ type: "USER_LOGIN", payload: data });
        setShowLoading(false);

        router.push("/your-profile");
      } catch (error) {
        setShowLoading(false);
        setMsg(error.message);
      }
    }
  };

  return (
    <Container sx={{ marginTop: "30px" }}>
      <Paper
        variant="outlined"
        sx={{
          width: { xs: "100%", sm: "90%", md: "50%", margin: "auto" },
        }}
      >
        <LinearProgress sx={{ display: showLoading ? "block" : "none" }} />
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} p={3}>
            <Typography variant="bold" component={"h1"} align="center">
              Signup
            </Typography>
            <Typography component={"span"} align="center" sx={{ color: "red" }}>
              {msg ? msg : null}
            </Typography>
            <TextField
              size="small"
              id="outlined-basic"
              color="secondary"
              label="Name"
              variant="outlined"
              placeholder="Type your full name"
              required
              type={"text"}
              
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              size="small"
              id="outlined-basic"
              color="secondary"
              label="Email Address"
              variant="outlined"
              placeholder="Type your email address"
              required
              type={"email"}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              size="small"
              color="secondary"
              id="outlined-basic"
              label="Password"
              type={"password"}
              variant="outlined"
              placeholder="Type your password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <TextField
              size="small"
              color="secondary"
              id="outlined-basic"
              label="Confirm Password"
              type={"password"}
              variant="outlined"
              placeholder="Type your password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <Button
              variant="outlined"
              fullWidth
              sx={{ background: "#0A1929", color: "#F2D000" }}
              type="submit"
            >
              Singup
            </Button>
            <Typography component={"span"}>
              Already have an account?
              <Link href={"/login"} passHref>
                <a> Signin</a>
              </Link>
            </Typography>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}
