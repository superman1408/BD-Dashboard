import React from "react";
import { Grid, IconButton } from "@mui/material";

import ListIcon from "@mui/icons-material/List";
import NoteIcon from "@mui/icons-material/Note";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const ProjectManager = () => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Grid sx={{ display: "flex", flexDirection: "row" }}>
        <Grid>
          <h1 className="text-xl font-normal text-500 ml-[20px] mr-[80px]">
            Project Manager
          </h1>
        </Grid>
        <Grid>
          <h1 className="text-base font-normal text-black-500 ml-[20px] mr-[40px]">
            MY SUMMARY
          </h1>
        </Grid>
        <Grid>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            // onClick={}
            color="inherit"
          >
            <Diversity2Icon />
          </IconButton>

          <h1 className="text-base font-normal text-black-500 ml-[20px] mr-[40px]">
            TEAM SUMMARY
          </h1>
        </Grid>
        <Grid>
          <h1 className="text-base font-normal text-black-500 ml-[20px] mr-[40px]">
            Portfolio SUMMARY
          </h1>
        </Grid>
        <Grid>
          <ListIcon sx={{ margin: "2px" }} />
          <h1 className="text-base font-normal text-black-500 ml-[20px] mr-[40px]">
            LIST
          </h1>
        </Grid>
        <Grid>
          <h1 className="text-base font-normal text-black-500 ml-[20px] mr-[40px]">
            BOARD
          </h1>
        </Grid>
        <Grid>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            // onClick={}
            color="inherit"
          >
            <CalendarMonthIcon />
          </IconButton>

          <h1 className="text-base font-normal text-black-500 ml-[20px] mr-[40px]">
            CALENDAR
          </h1>
        </Grid>
        <Grid>
          <NoteIcon />
          <h1 className="text-base font-normal text-black-500 ml-[20px] mr-[40px]">
            FILES
          </h1>
        </Grid>
      </Grid>
      <div className="overflow-auto   mt-3">
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
      </div>
    </div>
  );
};

export default ProjectManager;
