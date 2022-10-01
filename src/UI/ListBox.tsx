import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { type Options } from "./ComboBox";

import Arrow from "../../public/svg/arrow.svg";
import { Form } from "../pages";
import clsx from "clsx";

const ListBox = ({
  options,
  children,
  name,
  setForm,
  value,
}: {
  options: { id: number; name: string }[];
  children: React.ReactElement;
  name: string;
  setForm: React.Dispatch<React.SetStateAction<Form>>;
  value: Options;
}) => {
  return (
    <Listbox
      value={value}
      onChange={(v: Options) => setForm((p) => ({ ...p, [name]: v }))}
      as="div"
      className="border-b border-grey/20 pb-4"
    >
      {({ open }) => (
        <>
          <Listbox.Button className="relative flex w-full cursor-default items-center">
            {children}
            <span
              className={clsx(
                "block truncate text-sm text-grey outline-none",
                value.name !== options[0]?.name &&
                  "font-medium text-purple-dark"
              )}
            >
              {value.name}
            </span>
            <span
              className={clsx(
                "absolute inset-y-0 right-0 flex items-center p-2.5 transition-transform",
                open && "rotate-180"
              )}
            >
              <Arrow aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute left-0 z-10 mt-[16px] w-full rounded-b-20 border border-grey/20 bg-white py-2.5 text-sm text-grey shadow-lg">
              {options.map((item, index) => (
                <Listbox.Option
                  key={item.id}
                  className={({ active }) =>
                    clsx(
                      "relative cursor-pointer select-none py-2.5 px-[30px] hover:bg-purple-light/20",
                      active && index === options.length - 1 && "rounded-b-20"
                    )
                  }
                  value={item}
                >
                  <span
                    className={clsx(
                      "block truncate",
                      item.name === value.name && "font-medium text-purple-dark"
                    )}
                  >
                    {item.name}
                  </span>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </>
      )}
    </Listbox>
  );
};

export default ListBox;
