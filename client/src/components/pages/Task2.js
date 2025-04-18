import React, { useState } from "react";
import Button from "../Button/createButton";
import AddTask from "../task/AddTask";

const Task2 = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    console.log("button is clicked");
  };

  return (
    <div>
      <h2>Task</h2>
      <div className="flex justify-end">
        <Button
          label="+ Create Task"
          className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5"
          onClick={handleOpen}
        />
      </div>
      <AddTask open={open} setOpen={setOpen} />
    </div>
  );
};

export default Task2;
