
import React, { useState } from "react";
import {
  Button,
  TextField,
  Card,
  Box,
  Typography,
  Grid,
  InputAdornment,
  IconButton,
  Divider,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { signin, signup } from "../../action/auth";
import { useDispatch } from "react-redux";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";

import image from "../../assets/civil_background.png";
import { ToastContainer } from "react-toastify";

const initialData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "",
};

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const [code, setCode] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle all input fields
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };

  // Switch between login and signup
  const switchMode = () => {
    setIsSignUp((prevState) => !prevState);
    setFormData(initialData);
    setCode(null);
  };

  // Reset password
  const resetPassword = () => {
    navigate("/auth/reset", { replace: true });
  };

  // Common input styling
  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      backgroundColor: "#f8fafc",

      "& fieldset": {
        borderColor: "#dce3ec",
      },

      "&:hover fieldset": {
        borderColor: "#16355d",
      },

      "&.Mui-focused fieldset": {
        borderColor: "#16355d",
      },
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: "#16355d",
    },
  };

  // Password field
  const renderPassword = (
    name,
    label,
    visible,
    setVisible
  ) => (
    <TextField
      fullWidth
      required
      name={name}
      label={label}
      type={visible ? "text" : "password"}
      value={formData[name]}
      onChange={handleChange}
      autoComplete={
        name === "password"
          ? isSignUp
            ? "new-password"
            : "current-password"
          : "new-password"
      }
      sx={inputStyle}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <LockOutlinedIcon sx={{ color: "#8090a5" }} />
          </InputAdornment>
        ),

        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => setVisible(!visible)}
              edge="end"
              aria-label="toggle password visibility"
            >
              {visible ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );

  return (
    <Box
        className="auth-page"
        sx={{
          minHeight: "100vh",
          minHeight: "100dvh",
          width: "100%",
          overflowX: "hidden",
          overflowY: "auto",
          display: "flex",
          alignItems: { xs: "flex-start", md: "center" },
          justifyContent: "center",
          margin: { xs: "0 auto", md: "0 auto" },
          backgroundColor: "#edf1f6",
          p: { xs: 1, sm: 2, md: 4 },
          pb: { xs: 12, md: 4 },
          boxSizing: "border-box",
          fontFamily: "Roboto, sans-serif",
          marginBottom: { xs: "5px", md: "50px" },
        }}
      >
    
      {/* MAIN CARD */}

      <Card
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: "1100px",

          minHeight: { md: "650px" },

          height: "auto",
          flexShrink: 0,

          borderRadius: { xs: "12px", md: "16px" },

          overflow: "hidden",

          display: "flex",
          flexDirection: { xs: "column", md: "row" },

          boxShadow: "0 12px 45px rgba(15,35,65,0.12)",
        }}
      >
        {/* ================================= */}
        {/* LEFT CORPORATE PANEL */}
        {/* ================================= */}

        <Box
          sx={{
            width: { xs: "100%", md: "48%" },

            minHeight: { xs: "165px", sm: "190px", md: "650px" },

            position: "relative",

            backgroundImage: `
              linear-gradient(
                180deg,
                rgba(9,31,61,0.65),
                rgba(9,31,61,0.94)
              ),
              url(${image})
            `,

            backgroundSize: "cover",
            backgroundPosition: "center",

            color: "#fff",

            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",

            p: { xs: 2.5, sm: 3, md: 5 },
          }}
        >
          {/* COMPANY NAME */}

          <Box>
            <Typography
              variant="h5"
              fontWeight={800}
              letterSpacing={2}
              sx={{
                fontSize: { xs: "21px", md: "25px" },
              }}
            >
              ASHKAM
              <Box
                component="span"
                sx={{ color: "#ffffff" }}
              >
                {" "}ENERGY
              </Box>
            </Typography>

            <Typography
              variant="caption"
              sx={{
                letterSpacing: 3,
                color: "#d5dfeb",
              }}
            >
              PRIVATE LIMITED
            </Typography>
          </Box>

          {/* INTRODUCTION */}

          <Box
            sx={{
              maxWidth: "390px",
              mt: { xs: 1.5, md: 0 },
            }}
          >
            <EngineeringOutlinedIcon
              sx={{
                fontSize: { xs: 30, md: 48 },
                color: "#e55d17",
                mb: 1,
              }}
            />

            <Typography
              variant="h4"
              fontWeight={700}
              sx={{
                lineHeight: 1.3,
                fontSize: { xs: "20px", md: "34px" },
              }}
            >
              Engineering Excellence,
              <Box
                component="span"
                sx={{ color: "#f47a37" }}
              >
                {" "}Delivered.
              </Box>
            </Typography>

            <Typography
              sx={{
                mt: 1.5,
                color: "#dce5ef",
                lineHeight: 1.7,
                fontSize: { xs: "12px", md: "14px" },
              }}
            >
              A centralized platform to manage projects,
              monitor Daily Progress Reports (DPR), and
              streamline inventory management for
              efficient project execution.
            </Typography>

            <Divider
              sx={{
                my: { xs: 1.5, md: 3 },
                borderColor: "rgba(255,255,255,0.3)",
                width: "65px",
                borderBottomWidth: 3,
              }}
            />

            <Typography
              sx={{
                color: "#fff",
                fontWeight: 600,
                letterSpacing: 1,
                fontSize: "12px",
              }}
            >
              THRIVING ON EXCELLENCE
            </Typography>
          </Box>

          {/* COPYRIGHT */}

          <Typography
            variant="caption"
            sx={{
              color: "#bdc9d8",
              mt: 2,
              fontSize: "11px",
            }}
          >
            © {new Date().getFullYear()} Ashkam Energy Pvt. Ltd.
          </Typography>
        </Box>

        {/* ================================= */}
        {/* RIGHT AUTHENTICATION PANEL */}
        {/* ================================= */}

        <Box
          sx={{
            flex: 1,
            minWidth: 0,

            display: "flex",
            alignItems: { xs: "flex-start", md: "center" },
            justifyContent: "center",

            backgroundColor: "#fff",

            p: { xs: 2.5, sm: 4, md: 6 },
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: "390px",
              minWidth: 0,
            }}
          >
            {/* HEADING */}

            <Box sx={{ mb: 3 }}>
              <Typography
                variant="overline"
                sx={{
                  color: "#e55d17",
                  fontWeight: 700,
                  letterSpacing: 2,
                }}
              >
                {isSignUp ? "GET STARTED" : "WELCOME BACK"}
              </Typography>

              <Typography
                variant="h4"
                fontWeight={750}
                sx={{
                  color: "#16355d",
                  mt: 0.5,
                  fontSize: { xs: "27px", md: "30px" },
                }}
              >
                {isSignUp ? "Create Account" : "Sign In"}
              </Typography>

              <Typography
                sx={{
                  color: "#78869a",
                  mt: 1,
                  fontSize: "14px",
                }}
              >
                {isSignUp
                  ? "Register to access the Ashkam PMT portal."
                  : "Enter your credentials to access your dashboard."}
              </Typography>
            </Box>

            {/* ================================= */}
            {/* CREATE ACCOUNT BUTTON */}
            {/* IMPORTANT: ABOVE THE FORM */}
            {/* ================================= */}

            {!isSignUp && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",

                  backgroundColor: "#f3f6fa",
                  border: "1px solid #dce3ec",
                  borderRadius: "8px",

                  p: 1.5,
                  mb: 3,

                  width: "100%",
                  boxSizing: "border-box",
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "12px", sm: "13px" },
                    color: "#52647a",
                  }}
                >
                  New to Ashkam PMT?
                </Typography>

                <Button
                  type="button"
                  onClick={switchMode}
                  sx={{
                    color: "#e55d17",
                    fontWeight: 700,
                    textTransform: "none",
                    whiteSpace: "nowrap",
                    minWidth: "auto",
                    fontSize: "13px",
                  }}
                >
                  Create Account →
                </Button>
              </Box>
            )}

            {/* BACK TO SIGN IN */}

            {isSignUp && (
              <Box sx={{ mb: 2 }}>
                <Button
                  type="button"
                  onClick={switchMode}
                  sx={{
                    color: "#e55d17",
                    fontWeight: 600,
                    textTransform: "none",
                    p: 0,
                  }}
                >
                  ← Back to Sign In
                </Button>
              </Box>
            )}

            {/* ================================= */}
            {/* AUTHENTICATION FORM */}
            {/* ================================= */}

            <form
              onSubmit={handleSubmit}
              autoComplete="on"
            >
              {/* FIRST NAME AND LAST NAME */}

              {isSignUp && (
                <Grid
                  container
                  spacing={2}
                  sx={{ mb: 2 }}
                >
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      sx={inputStyle}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      sx={inputStyle}
                    />
                  </Grid>
                </Grid>
              )}

              {/* EMAIL */}

              <TextField
                fullWidth
                required
                type="email"
                label="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                sx={{
                  ...inputStyle,
                  mb: 2,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon
                        sx={{ color: "#8090a5" }}
                      />
                    </InputAdornment>
                  ),
                }}
              />

              {/* PASSWORD */}

              {renderPassword(
                "password",
                "Password",
                showPassword,
                setShowPassword
              )}

              {/* CONFIRM PASSWORD */}

              {isSignUp && (
                <Box sx={{ mt: 2 }}>
                  {renderPassword(
                    "confirmPassword",
                    "Confirm Password",
                    showConfirmPassword,
                    setShowConfirmPassword
                  )}
                </Box>
              )}

              {/* ADMIN SECRET CODE - EXISTING CONDITION */}

              {isSignUp && formData.role === "admin" && (
                <TextField
                  fullWidth
                  required
                  type="password"
                  label="Secret Code"
                  name="secretCode"
                  sx={{
                    ...inputStyle,
                    mt: 2,
                  }}
                  onChange={(e) => setCode(e.target.value)}
                />
              )}

              {/* FORGOT PASSWORD */}

              {!isSignUp && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mt: 1,
                  }}
                >
                  <Button
                    type="button"
                    onClick={resetPassword}
                    sx={{
                      textTransform: "none",
                      color: "#e55d17",
                      fontWeight: 600,
                      fontSize: "13px",
                    }}
                  >
                    Forgot Password?
                  </Button>
                </Box>
              )}

              {/* SUBMIT BUTTON */}

              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{
                  mt: 3,
                  py: 1.5,

                  borderRadius: "8px",

                  backgroundColor: "#16355d",

                  fontWeight: 700,
                  fontSize: "15px",

                  textTransform: "none",
                  boxShadow: "none",

                  "&:hover": {
                    backgroundColor: "#e55d17",
                    boxShadow: "none",
                  },
                }}
              >
                {isSignUp ? "Create Account" : "Sign In"}
              </Button>

              {/* TOAST */}

              <ToastContainer />

            </form>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default Auth;
