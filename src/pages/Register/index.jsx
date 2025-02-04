import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { registerUser, setError} from "../../redux/slice/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [authUser, setAuthUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const {user, isLoading, error, isloggedIn} = useSelector(state => state.auth)
  const navigate = useNavigate()
  
  const dispatch = useDispatch()

   useEffect(() => {
      if(user.userName && user.email) {
        navigate("/")
      }
    }, [user, navigate])

  const handleChange = (e) => {
    const newAuthUser = {
      ...authUser,
      [e.target.name] : e.target.value
    } 
    setAuthUser(newAuthUser)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Auth USer", authUser);
    if(authUser.password !== authUser.confirmPassword) {
      dispatch(setError("Password did not match the confirm password!!"))
    } else {
      dispatch(setError(null))
      dispatch(registerUser(authUser))
    }
  }

  console.log("Error", error)
  console.log("User", user)

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
          Sign up to Study Buddy
        </Typography>
        {error && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            {error}
          </Alert>
        )}
        <Box
          sx={{
            width: "70%",
            display: "flex",
            gap: 2,
          }}
        >
          {/* First Name */}
          <TextField
            id="signup-first_name-input"
            label="First Name"
            name= "firstName"
            type="text"
            autoComplete="current-first_name"
            fullWidth
            required
            value={authUser.firstName}
            onChange={handleChange}
          />

          {/* Last Name */}
          <TextField
            id="signup-last_name-input"
            label="Last Name"
            name="lastName"
            type="text"
            autoComplete="current-last_name"
            fullWidth
            required
            value={authUser.lastName}
            onChange={handleChange}
          />
        </Box>
        <Box
          sx={{
            width: "70%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {/* Email */}
          <TextField
            id="signup-email-input"
            label="Email"
            name="email"
            type="email"
            autoComplete="current-email"
            fullWidth
            required
            value={authUser.email}
            onChange={handleChange}
          />

          {/* Password */}
          <TextField
            id="signup-password-input"
            label="Enter Password"
            name="password"
            type="password"
            autoComplete="current-password"
            fullWidth
            required
            value={authUser.password}
            onChange={handleChange}
          />

          {/* Confirm Password */}
          <TextField
            id="signup-confirm_password-input"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            autoComplete="current-password"
            fullWidth
            required
            value={authUser.confirmPassword}
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
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Register"
            )}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
