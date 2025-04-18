import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useRef } from "react";

const ModalWrapper = ({ open, setOpen, children }) => {
  // const cancelButtonRef = useRef(null);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog onClose={() => setOpen(false)}>
        <div
          className="fixed inset-0 bg-gray bg-opacity-60 alignment-center"
          aria-hidden="true"
        >
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full max-w-7xl items-center justify-center px-4 text-center sm:p-0 ">
              {/* dialog is needed for rendering dialog data */}
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                {children}
              </Dialog.Panel>{" "}
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalWrapper;
