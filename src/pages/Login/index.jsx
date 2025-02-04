import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../redux/slice/authSlice";
export const Login = () => {
  const [authUser, setAuthUser] = useState({
    email: "",
    password: ""
  })
  const {user, isLoading, error, isLoggedIn} = useSelector(state => state.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const newAuthUser = {
      ...authUser,
      [e.target.name]: e.target.value
    }
    setAuthUser(newAuthUser)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(authUser))
  }

  console.log("Auth USer", authUser)
  console.log("USer", user)
 
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
      fixed
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          justifyContent: "space-between",
          alignItems: "center",
          padding: 4,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "white",
          width: "100%",
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          textAlign="center"
          fontWeight="bold"
          marginBottom={3}
        >
          Login to Study Buddy
        </Typography>
        {error && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            {error}
          </Alert>
        )}
        <TextField
          id="login-email-input"
          label="Email"
          name="email"
          type="email"
          autoComplete="current-email"
          fullWidth
          required
          value={authUser.email}
          onChange={handleChange}
        />
        <TextField
          id="login-password-input"
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          fullWidth
          required
          value={authUser.password}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          size="large"
          type="submit"
          fullWidth
          sx={{
            mt: 2,
            py: 1.5,
            fontWeight: "bold",
            fontSize: "1rem",
          }}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : "Login"}
        </Button>
        <Typography
          textAlign="center"
          marginTop={2}
          fontSize="0.9rem"
          color="gray"
        >
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            style={{ color: "#1976d2", textDecoration: "none" }}
          >
            Sign Up
          </Link>
        </Typography>
        <Typography
          textAlign="center"
          marginTop={1}
          fontSize="0.9rem"
          color="gray"
        >
          Forgot your password?{" "}
          <Link
            to="/reset-password"
            style={{ color: "#1976d2", textDecoration: "none" }}
          >
            Reset It
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};
