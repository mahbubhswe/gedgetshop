import React, { useState, useContext } from "react";
import {
  Container,
  Paper,
  Button,
  Stack,
  TextField,
  Typography,
  LinearProgress,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  GoogleLoginButton,
  FacebookLoginButton,
} from "react-social-login-buttons";
import axios from "axios";
import { contextStore } from "../utils/Store";
export default function SignIn({ urlPath, children }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [err, setErr] = useState();
  const [showLoading, setShowLoading] = useState(false);
  const { dispatch } = useContext(contextStore);
  const router = useRouter();

  //login
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.target.reset();
    try {
      setShowLoading(true);
      const { data } = await axios.post("/api/user/login", {
        email: email,
        password: password,
      });
      setShowLoading(false);

      if (email.localeCompare(data.email) === 0) {
        dispatch({ type: "USER_LOGIN", payload: data });
        if (data.isAdmin) {
          return router.push("/admin");
        } else {
          return router.push(urlPath ? urlPath : "/your-profile");
        }
      }
      setErr(data);
    } catch (error) {
      setErr(error.message);
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
          <Stack spacing={2} p={2}>
            <Typography variant="bold" component={"h2"} align="center">
              Signin
            </Typography>
            {/* <Stack spacing={1}>
              <GoogleLoginButton
                style={{ background: "#E2AD15", color: "white" }}
                onClick={loginWithGoogle}
              >
                <span>Login</span>
              </GoogleLoginButton>
              <FacebookLoginButton onClick={() => alert("Hello")}>
                <span>Login</span>
              </FacebookLoginButton>
            </Stack>

            <Typography variant="bold" component={"h2"} align="center">
              OR
            </Typography> */}
            <Typography component={"span"} align="center" sx={{ color: "red" }}>
              {err ? err : null}
            </Typography>
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
            <Button
              variant="outlined"
              fullWidth
              sx={{ background: "#0A1929", color: "#F2D000" }}
              type="submit"
            >
              Signin
            </Button>
            <Typography component={"p"}>
              Login as admin email:mahbub@gmail.com pass:123456
            </Typography>
            <Typography component={"span"}>
              Are you new?
              <Link href={"/register"} passHref>
                <a> Create a account</a>
              </Link>
            </Typography>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}
