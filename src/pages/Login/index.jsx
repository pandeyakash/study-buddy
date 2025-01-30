import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // Redirect to the home page
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };
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
        onSubmit={handleLogin}
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
          type="email"
          autoComplete="current-email"
          fullWidth
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="login-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          fullWidth
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
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
