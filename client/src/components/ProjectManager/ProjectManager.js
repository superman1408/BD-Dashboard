import React from "react";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import { create } from "../Button/createUser";

import {
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";

import Fab from "@mui/material/Fab";

import ListIcon from "@mui/icons-material/List";
import NoteIcon from "@mui/icons-material/Note";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import DashboardIcon from "@mui/icons-material/Dashboard";
import MailIcon from "@mui/icons-material/Mail";
import LogoutIcon from "@mui/icons-material/Logout";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import TopicIcon from "@mui/icons-material/Topic";
import AddIcon from "@mui/icons-material/Add";

const ProjectManager = ({ create }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

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
          <Grid sx={{ margin: "20px" }}>
            <Fab
              variant="extended"
              size="small"
              color="primary"
              sx={{ mr: 1 }}
              onClick={openDialog}
            >
              <AddIcon sx={{ mr: 1 }} />
              Create new user
            </Fab>
            <h1>{create}</h1>
            <Transition appear show={isOpen} as={Fragment}>
              <Dialog as="div" className="relative z-10" onClose={closeDialog}>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          User Details
                        </Dialog.Title>
                        <form className="mt-4 space-y-4">
                          <input
                            type="text"
                            placeholder="Name"
                            className="w-full rounded border p-2"
                          />
                          <input
                            type="email"
                            placeholder="Email"
                            className="w-full rounded border p-2"
                          />
                          <input
                            type="tel"
                            placeholder="Phone"
                            className="w-full rounded border p-2"
                          />
                          <div className="flex justify-end space-x-2">
                            <button
                              type="button"
                              onClick={closeDialog}
                              className="px-4 py-2 rounded bg-gray-300"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="px-4 py-2 rounded bg-blue-600 text-white"
                            >
                              Submit
                            </button>
                          </div>
                        </form>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
            {/* </Grid>
          <Grid> */}
            <h1 className="text-lg font-normal text-500 ml-[20px] mr-[80px] mt-[20px]">
              Project Manager
            </h1>
            <List>
              <ListItem
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
                disablePadding
              >
                <ListItemButton>
                  {/* <ListItemIcon></ListItemIcon> */}
                  <ListItemText className="text-sm font-normal text-black-500  ml-[20px]">
                    Project Manager
                  </ListItemText>
                </ListItemButton>

                <ListItemButton>
                  {/* <ListItemIcon></ListItemIcon> */}
                  <ListItemText className="text-sm font-normal text-black-500  ml-[20px]">
                    Project Manager
                  </ListItemText>
                </ListItemButton>

                <ListItemButton>
                  {/* <ListItemIcon></ListItemIcon> */}
                  <ListItemText className="text-sm font-normal text-black-500  ml-[20px]">
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
            <h1 className="text-sm font-normal text-black-500 mr-[40px]">
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
            <h1 className="text-sm font-normal text-black-500 mr-[40px]">
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
