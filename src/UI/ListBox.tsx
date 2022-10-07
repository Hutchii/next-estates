import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import clsx from "clsx";
import type { FiltersForm, SelectOptions } from "../pages";

import Arrow from "../../public/svg/arrow.svg";
import X from "../../public/svg/x.svg";

const ListBox = ({
  options,
  children,
  name,
  placeholder,
  onChange,
  value,
  initialValues,
}: {
  options: { id: number; name: string }[];
  children: React.ReactElement;
  name: string;
  placeholder: string;
  onChange: React.Dispatch<React.SetStateAction<FiltersForm>>;
  value: SelectOptions;
  initialValues: SelectOptions;
}) => {
  return (
    <Listbox
      value={value}
      onChange={(v: SelectOptions) => onChange((p) => ({ ...p, [name]: v }))}
    >
      {({ open }) => (
        <>
          <Listbox.Button className="flex w-full cursor-pointer items-center pr-2.5">
            <span>{children}</span>
            <span
              className={clsx(
                "block truncate text-sm leading-10 text-purple-dark/60 outline-none",
                value.name && "font-medium text-purple-dark/80"
              )}
            >
              {value.name || placeholder}
            </span>
            <span className="ml-auto mt-0.5 flex items-center">
              <div
                className="cursor-pointer pr-1.5"
                onClick={(e: React.FormEvent<HTMLDivElement>) => {
                  e.stopPropagation();
                  onChange((prevValues) => ({
                    ...prevValues,
                    [name]: initialValues,
                  }));
                }}
              >
                <X className="h-5 w-5 fill-purple-dark/60" />
              </div>
              <div className="h-4 w-[1px] bg-purple-dark/30" />
              <div className="cursor-pointer pl-1.5">
                <Arrow
                  aria-hidden="true"
                  className={clsx(
                    "h-6 w-6 fill-purple-dark/60 transition-transform",
                    open && "rotate-180"
                  )}
                />
              </div>
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute left-0 z-10 mt-[16px] w-full rounded-b-20 border border-grey/20 bg-white py-2.5 text-sm shadow-lg lg:mt-2.5">
              {options.map((item) => (
                <Listbox.Option
                  key={item.id}
                  className="relative cursor-pointer select-none py-2.5 px-[30px] text-purple-dark/60 hover:bg-purple-light/20"
                  value={item}
                >
                  {({ selected }) => (
                    <span
                      className={clsx(
                        "block truncate",
                        selected && "font-medium text-purple-dark/80"
                      )}
                    >
                      {item.name}
                    </span>
                  )}
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
