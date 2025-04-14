import React from "react";
import Button from "../Button/createButton";

const Task2 = () => {
  return (
    <div>
      <h1>Task</h1>
      <Button
        label="+ Create Task"
        className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5"
      />
    </div>
  );
};

export default Task2;
