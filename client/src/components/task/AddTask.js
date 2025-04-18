import React, { useState } from "react";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import { Dialog } from "@headlessui/react";
import TextBox from "../TextBox/TextBox";
import { useForm } from "react-hook-form";
import Button from "../Button/createButton";
import SelectList from "../SelectList/SelectList";

const LISTS = ["TODO", "IN PROGRESS", "COMPLETED"];

const AddTask = ({ open, setOpen }) => {
  const task = "";

  const [stage, setStage] = useState(task?.stage?.toUpperCase() || LISTS[0]);

  const {
    register,
    formState: { errors },
  } = useForm();
  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form>
          <Dialog.Title>Add Task</Dialog.Title>
          <div className="mt-2 flex flex-col gap-6">
            <TextBox
              placeholder="Task title"
              type="text"
              name="title"
              label="task Title"
              className="w-full rounded"
              register={register("title", { required: "Title is required" })}
              error={errors.title ? errors.title.message : ""}
            />

            <SelectList
              label="Task Stage"
              lists={LISTS}
              selected={stage}
              setSelected={setStage}
            />

            <Button
              type="button"
              className="px-5 text-sm font-semibold text-gray-900 sm:w-auto "
              onClick={() => setOpen(false)}
              label="Cancel"
            />
          </div>
        </form>
      </ModalWrapper>
    </>
  );
};

export default AddTask;
