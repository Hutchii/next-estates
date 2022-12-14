import { useState, Fragment } from "react";
import { Combobox, Transition } from "@headlessui/react";
import clsx from "clsx";
import type { FiltersForm, SelectOptions } from "../pages";

import Arrow from "../../public/svg/arrow.svg";
import X from "../../public/svg/x.svg";

const ComboBox = ({
  options,
  children,
  name,
  onChange,
  value,
  placeholder,
  initialValues,
}: {
  options: { id: number; name: string }[];
  children: React.ReactElement;
  name: string;
  onChange: React.Dispatch<React.SetStateAction<FiltersForm>>;
  value: SelectOptions[];
  placeholder: string;
  initialValues: SelectOptions[];
}) => {
  const [query, setQuery] = useState("");

  const filteredOptions =
    query === ""
      ? options
      : options.filter((item) =>
          item.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );
  const resetQuery = () => setQuery("");
  return (
    <Combobox
      value={value}
      onChange={(value: SelectOptions[]) =>
        onChange((prevValues) => ({ ...prevValues, [name]: value }))
      }
      multiple
    >
      {({ open, value }) => (
        <>
          <div className="flex w-full items-center pr-2.5">
            <span>{children}</span>
            <Combobox.Input
              placeholder={placeholder}
              className="w-full pr-2.5 text-sm font-medium leading-10 text-purple-dark/80 outline-none placeholder:text-sm placeholder:font-normal placeholder:text-purple-dark/60"
              displayValue={(items: SelectOptions[]) =>
                items
                  .slice(1)
                  .map((item) => item.name)
                  .join(", ")
              }
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="">
              <span className="flex items-center">
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
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-[0.98]"
            afterLeave={resetQuery}
          >
            <Combobox.Options className="absolute left-0 z-10 mt-[16px] w-full rounded-b-20 border border-grey/20 bg-white py-2.5 text-sm text-purple-dark/60 shadow-lg lg:mt-2.5">
              <>
                {value.length > 1 && (
                  <>
                    <span className="block px-[30px] pt-2.5 text-[0.938rem] font-medium text-purple">
                      SELECTED:
                    </span>
                    <ul className="border-b border-grey/20">
                      {value.slice(1).map((item) => (
                        <li
                          className="relative flex w-full cursor-pointer select-none py-2.5 px-[30px] font-medium text-purple-dark/80 hover:bg-purple-light/20"
                          key={item.id}
                          onClick={() =>
                            onChange((prevValues) => ({
                              ...prevValues,
                              [name]: [
                                ...(prevValues as any)[name]?.filter(
                                  (filteredItem: SelectOptions) =>
                                    filteredItem.name !== item.name
                                ),
                              ],
                            }))
                          }
                        >
                          {item.name}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                {filteredOptions.length === 0 && query !== "" ? (
                  <span className="relative block cursor-default select-none py-2.5 px-[30px]">
                    Nothing found.
                  </span>
                ) : (
                  filteredOptions.map((item) => (
                    <Combobox.Option
                      key={item.id}
                      className="relative cursor-pointer select-none py-2.5 px-[30px] hover:bg-purple-light/20"
                      value={item}
                      onClick={resetQuery}
                    >
                      {({ selected }) => (
                        <span
                          className={clsx(
                            "block truncate",
                            selected && "font-medium text-purple-dark/70"
                          )}
                        >
                          {item.name}
                        </span>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </>
            </Combobox.Options>
          </Transition>
        </>
      )}
    </Combobox>
  );
};

export default ComboBox;
