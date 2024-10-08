import React, { useState } from "react";
import { Button, Grid, TextField, Card, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "../../action/auth";
import { useDispatch } from "react-redux";

import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import image from "../../assests/BD_login.png";

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
  const [isSignUp, setisSignUp] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [code, setCode] = useState(null);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [formData, setFormData] = useState(initialData);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };

  const switchMode = () => {
    setisSignUp((prevState) => !prevState);
  };

  //   const [selectedOption, setSelectedOption] = useState(null);

  //   const handleCheckboxChange = (option, event) => {
  //     setSelectedOption(option);
  //     console.log(option);
  //     setFormData({
  //       ...formData,
  //       role: option,
  //     });
  //   };

  const resetPassword = () => {
    navigate("/auth/reset", { replace: true });
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        padding: "40px",
        // backgroundColor: "#15345c",
      }}
    >
      <Grid
        sx={{
          display: "flex",
          flexDirection: "row",
          // height: "600px",
          //   maxHeight: "1000px",
        }}
      >
        <Card
          className="card"
          elevation={10}
          sx={{
            backgroundImage: `url(${image})`,
            // minheight: "100%",
            width: "300px",
            maxWidth: "300px",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            padding: "40px",
          }}
        ></Card>
        <Card
          className="card"
          elevation={10}
          sx={{
            display: "flex",
            width: "400px",
            maxWidth: "400px",
            justifyContent: "center",
            alignItems: "center",
            padding: "40px",
          }}
        >
          <Grid sx={{ justifyContent: "center", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                color: "primary",
                marginTop: "2px",
              }}
            >
              <AccountCircleIcon
                fontSize="large"
                color={isSignUp ? "primary" : "secondary"}
              />
            </div>

            <h3
              style={{
                color: "#16355d",
                textAlign: "center",
              }}
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </h3>
            {/* <Typography color="#0B7882"> Welcome to Ashkam 👋 </Typography> */}

            <form autoComplete="on" onSubmit={handleSubmit}>
              {isSignUp && (
                <div
                  style={{ display: "flex", justifyContent: "space-evenly" }}
                >
                  <div>
                    {formData.role === "admin" && (
                      // eslint-disable-next-line
                      <TextField
                        type="password"
                        label="Secret Code"
                        name="secretCode"
                        variant="outlined"
                        onChange={(event) => setCode(event.target.value)}
                      />
                    )}
                  </div>
                </div>
              )}

              <div style={{ marginTop: "30px", display: "flex" }}>
                {isSignUp && (
                  <TextField
                    label="First Name"
                    name="firstName"
                    variant="outlined"
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        firstName: event.target.value,
                      })
                    }
                  />
                )}
                {isSignUp && (
                  <TextField
                    sx={{ marginLeft: "10px" }}
                    label="Last Name"
                    name="lastName"
                    variant="outlined"
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        lastName: event.target.value,
                      })
                    }
                  />
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "10px",
                }}
              >
                <TextField
                  name="email"
                  variant="outlined"
                  required
                  fullWidth
                  label="Email Address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />

                <FormControl
                  sx={{ marginTop: "10px" }}
                  variant="outlined"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>

                {isSignUp && (
                  <FormControl
                    sx={{ marginTop: "10px" }}
                    variant="outlined"
                    required
                    fullWidth
                    type="password"
                    label="Confirm Password"
                    autoComplete="current-password"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                  >
                    <InputLabel htmlFor="outlined-adornment-confirmPassword">
                      Confirm Password
                    </InputLabel>
                    <OutlinedInput
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Confirm Password"
                    />
                  </FormControl>
                )}
              </div>
              <div>
                <Button
                  variant="contained"
                  required
                  color={isSignUp ? "primary" : "secondary"}
                  fullWidth
                  type="submit"
                  sx={{ marginTop: "10px" }}
                >
                  {isSignUp ? "Sign Up" : "Sign In"}
                </Button>
                {isSignUp ? <ToastContainer /> : <ToastContainer />}
                {/* this is required for rendering taost it works as a container*/}
              </div>
              <Grid>
                <div
                  style={{
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                >
                  <Button sx={{ color: "#16355d" }} onClick={resetPassword}>
                    Reset The Password
                  </Button>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "center",

                    color: "#16355d",
                  }}
                >
                  <Button sx={{ color: "#16355d" }} onClick={switchMode}>
                    {isSignUp
                      ? "  Already have an account? Login here!  "
                      : "Don't have an account ? Register here!"}
                  </Button>
                </div>
              </Grid>
            </form>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Auth;
