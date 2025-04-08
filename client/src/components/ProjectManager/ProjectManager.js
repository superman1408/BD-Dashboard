import React from "react";
import {
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";

import ListIcon from "@mui/icons-material/List";
import NoteIcon from "@mui/icons-material/Note";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import DashboardIcon from "@mui/icons-material/Dashboard";
import MailIcon from "@mui/icons-material/Mail";
import LogoutIcon from "@mui/icons-material/Logout";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import TopicIcon from "@mui/icons-material/Topic";

const ProjectManager = () => {
  const menuItems = [
    { text: "Project Window", icon: <DashboardIcon />, link: "/projectwindow" },
    {
      text: "Contract Register",
      icon: <AppRegistrationIcon />,
      link: "/contractregister",
    },
    {
      text: "Contract Details",
      icon: <TopicIcon />,
      link: "/contractviewdetails",
    },
    {
      text: "Letter Tracker",
      icon: <MailIcon />,
      link: "/lettertracker",
    },
    {
      text: "Time Sheet Display",
      icon: <MailIcon />,
      link: "/timesheet",
    },
    {
      text: "Tasks",
      icon: <MailIcon />,
      link: "/tasks",
    },
    {
      text: "Task Completed",
      icon: <MailIcon />,
      link: "/completed/:status",
    },
    {
      text: "Task in-progress",
      icon: <MailIcon />,
      link: "/in-progress/:status",
    },
    {
      text: "Todo",
      icon: <MailIcon />,
      link: "/todo/:status",
    },
  ];

  return (
    <div style={{ marginBottom: "10px" }}>
      <Grid sx={{ display: "flex", flexDirection: "row" }}>
        <Grid sx={{ display: "flex", flexDirection: "column" }}>
          <Grid>
            <h1 className="text-lg font-normal text-500 ml-[20px] mr-[80px]">
              Project Manager
            </h1>
            <List>
              <ListItem
                sx={{
                  // display: "flex",
                  flexDirection: "column",
                  marginLeft: "0px",
                }}
                disablePadding
              >
                <ListItemButton>
                  {/* <ListItemIcon></ListItemIcon> */}
                  <ListItemText className="text-sm font-normal text-black-500  mr-[40px]">
                    Project Manager
                  </ListItemText>
                </ListItemButton>

                <ListItemButton>
                  {/* <ListItemIcon></ListItemIcon> */}
                  <ListItemText className="text-sm font-normal text-black-500  mr-[40px]">
                    Project Manager
                  </ListItemText>
                </ListItemButton>

                <ListItemButton>
                  {/* <ListItemIcon></ListItemIcon> */}
                  <ListItemText className="text-sm font-normal text-black-500  mr-[40px]">
                    Project Manager
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            </List>
          </Grid>
        </Grid>
        <Grid sx={{ display: "flex", flexDirection: "row" }}>
          <Grid className="flex flex-row items-center ">
            <IconButton
              size="small"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <CalendarMonthIcon />
            </IconButton>
            <h1 className="text-sm font-normal text-black-500  mr-[40px]">
              MY SUMMARY
            </h1>
          </Grid>
          <Grid className="flex flex-row items-center">
            <IconButton
              size="small"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              // onClick={}
              color="inherit"
            >
              <Diversity2Icon />
            </IconButton>

            <h1 className="text-sm font-normal text-black-500  mr-[40px]">
              TEAM SUMMARY
            </h1>
          </Grid>
          <Grid className="flex flex-row items-center">
            <IconButton
              size="small"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <CalendarMonthIcon />
            </IconButton>
            <h1 className="text-sm font-normal text-black-500  mr-[40px]">
              Portfolio SUMMARY
            </h1>
          </Grid>
          <Grid className="flex flex-row items-center">
            <ListIcon sx={{ margin: "2px" }} />
            <h1 className="text-sm font-normal text-black-500 ml-[20px] mr-[40px]">
              LIST
            </h1>
          </Grid>
          <Grid className="flex flex-row items-center">
            <IconButton
              size="small"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <CalendarMonthIcon />
            </IconButton>
            <h1 className="text-sm font-normal text-black-500  mr-[40px]">
              BOARD
            </h1>
          </Grid>

          <div className="flex flex-row items-center">
            <IconButton
              size="small"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <CalendarMonthIcon />
            </IconButton>
            <h1 className="text-sm font-normal text-black-500 mr-[40px]">
              CALENDAR
            </h1>
          </div>

          <Grid className="flex flex-row items-center">
            <IconButton
              size="small"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              // onClick={}
              color="inherit"
            >
              <NoteIcon />
            </IconButton>
            <h1 className="text-sm font-normal text-black-500  mr-[40px]">
              FILES
            </h1>
          </Grid>
        </Grid>
      </Grid>
      {/* <div className="overflow-auto   mt-3">
        <div className="overflow-auto rounded-lg shadow hidden md:block ">
          <table className="w-full ">
            <thead className="bg-gray-100 border-b-2 border-gray-200">
              <tr>
                <th className="p-3 text-sm font-semibold tracking-wide text-center">
                  Project Manager
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-center">
                  My Summary
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-center">
                  Team Summary
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-center">
                  Portfolio Summary
                </th>
              </tr>
            </thead>
          </table>
        </div>
      </div> */}
      <Grid></Grid>
    </div>
  );
};

export default ProjectManager;
