import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { LOGOUT } from "../../constants/actionTypes";

import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Divider,
  ListItemText,
  Menu,
  Drawer,
} from "@mui/material";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";

import MenuItem from "@mui/material/MenuItem";
// import Menu from "@mui/material/Menu";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MailIcon from "@mui/icons-material/Mail";
import LogoutIcon from "@mui/icons-material/Logout";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import Badge from "@mui/material/Badge";
import { useTheme } from "@emotion/react";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function MenuAppBar() {
  const user = JSON.parse(localStorage.getItem("profile"));
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {});

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const switchMode = (e) => {
    e.preventDefault();
    // setUser(null);
    dispatch({ type: LOGOUT });
    navigate("/auth");
  };

  const menuItems = [
    { text: "Project Window", icon: <DashboardIcon />, link: "/dashboard" },
    // { text: "DataSheet", icon: <MailIcon />, link: "/datasheet" },
    // { text: "Profile", icon: <PeopleAltIcon /> },
    {
      text: "Contract Register",
      icon: <AppRegistrationIcon />,
      link: "/contractregister",
    },
    { text: "Logout", icon: <LogoutIcon />, onClick: switchMode },
  ];

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            {item.link ? (
              <ListItemButton component={Link} to={item.link}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            ) : (
              <ListItemButton onClick={item.onClick}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            )}
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <>
      {user ? (
        <>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="sticky" sx={{ bgcolor: "#17325C" }}>
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                >
                  <MenuIcon onClick={toggleDrawer(true)} />
                  <Drawer open={open} onClose={toggleDrawer(false)}>
                    <DrawerHeader>
                      <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "ltr" ? (
                          <ChevronLeftIcon />
                        ) : (
                          <ChevronRightIcon />
                        )}
                      </IconButton>
                    </DrawerHeader>
                    <Divider />
                    {DrawerList}
                  </Drawer>
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Project Management Tool
                </Typography>
                {auth && (
                  <div>
                    {/* <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      color="inherit"
                    >
                      <AccountCircle />
                    </IconButton>
                    {/* <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleClose}>Profile</MenuItem>
                      <MenuItem onClick={handleClose}>My Account</MenuItem>
                      <MenuItem onClick={switchMode}>Logout</MenuItem>
                    </Menu> */}
                  </div>
                )}
              </Toolbar>
            </AppBar>
          </Box>
        </>
      ) : (
        <div>
          <marquee
            style={{
              color: "#ffffff",
              fontFamily: "Roboto",
              fontWeight: "bold",
              backgroundColor: "#15345c",
              padding: "5px",
              minWidth: "390px",
            }}
          >
            Please Login to your account
          </marquee>
        </div>
      )}
    </>
  );
}
