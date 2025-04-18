import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { BsChevronBarExpand } from "react-icons/bs";

const SelectList = ({ lists, selected, setSelected, label }) => {
  return (
    <div>
      {label && <p className="text-slate-900 dark:text-gray-500">{label}</p>}
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button>
            <span className="block truncate"></span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"></span>
            <BsChevronBarExpand
              className="w-5 h-5 text-gray-500"
              aria-hidden="true"
            />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in durartion-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options>
              {lists.map((list, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                  value={list}
                ></Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default SelectList;
