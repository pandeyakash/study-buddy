import { Box, Button, CircularProgress, Container, TextField, Typography } from "@mui/material";
import { resetUserPassword } from "../../redux/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const ResetPassword = () => {
  const {user, isLoading, error} = useSelector(state => state.auth)
  const [email, setEmail] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(resetUserPassword(email))
  }

  console.log("Error", error);
  
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
          Reset your password
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          {isLoading ? <CircularProgress size={24} color="inherit" /> : "Send E-mail"}
        </Button>
      </Box>
    </Container>
  );
};
