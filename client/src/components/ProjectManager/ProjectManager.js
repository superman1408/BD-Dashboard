import React, { useState } from "react";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

// import AddUser from "../../components1/AddUser";
import AddUser from "../Dialog/AddUser";
import Button from "../Button/createButton";

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

const ProjectManager = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return (
    <div style={{ marginBottom: "10px", float: "left" }}>
      <Grid container direction="row" alignItems="center" spacing={2}>
        <Grid item>
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
            <AddUser
              open={open}
              setOpen={setOpen}
              userData={selected}
              key={new Date().getTime().toString()}
            />
            {/* <Transition appear show={isOpen} as={Fragment}>
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
            </Transition> */}
            <h1 className="text-lg font-normal text-500 ml-[20px] mr-[20px] mt-[2px]">
              Project Manager
            </h1>
            <Button onClick={AddUser}>
              <h1>Create new user</h1>
            </Button>
          </Grid>
        </Grid>
        <Grid item xs sx={{ marginTop: 0 }}>
          <Grid container spacing={2} alignItems="center">
            {[
              { icon: <CalendarMonthIcon />, label: "MY SUMMARY" },
              { icon: <Diversity2Icon />, label: "TEAM SUMMARY" },
              { icon: <CalendarMonthIcon />, label: "Portfolio SUMMARY" },
              { icon: <ListIcon />, label: "LIST" },
              { icon: <CalendarMonthIcon />, label: "BOARD" },
              { icon: <CalendarMonthIcon />, label: "CALENDAR" },
              { icon: <NoteIcon />, label: "FILES" },
            ].map((item, index) => (
              <Grid item key={index} className="flex items-center space-x-2">
                <IconButton size="small" color="inherit">
                  {item.icon}
                </IconButton>
                <span className="text-sm text-gray-700">{item.label}</span>
              </Grid>
            ))}
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
    </div>
  );
};

export default ProjectManager;
