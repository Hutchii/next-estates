import { useState, Fragment } from "react";
import { Combobox, Transition } from "@headlessui/react";
import clsx from "clsx";
import { type Form } from "../pages";

import Arrow from "../../public/svg/arrow.svg";

export type Options = {
  id: number;
  name: string;
  value: string;
};

const ComboBox = ({
  options,
  children,
  name,
  setForm,
  value,
  placeholder,
}: {
  options: { id: number; name: string }[];
  children: React.ReactElement;
  name: string;
  setForm: React.Dispatch<React.SetStateAction<Form>>;
  value: Options[];
  placeholder: string;
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

  return (
    <Combobox
      as="div"
      value={value}
      onChange={(value: Options[]) =>
        setForm((prevValues) => ({ ...prevValues, [name]: value }))
      }
      className="border-b border-grey/20 pb-4"
      multiple
    >
      {({ open, value }) => (
        <>
          <div className="relative flex items-center">
            {children}
            <Combobox.Button
              as="span"
              className="flex w-full items-center pr-2.5"
            >
              <Combobox.Input
                placeholder={placeholder}
                className="w-full pr-2.5 text-sm font-medium text-purple-dark outline-none placeholder:font-normal placeholder:text-grey"
                displayValue={(items: Options[]) =>
                  items
                    .slice(1)
                    .map((person) => person.name)
                    .join(", ")
                }
                onChange={(event) => setQuery(event.target.value)}
              />
              <Arrow
                aria-hidden="true"
                className={clsx(
                  "cursor-pointer transition-transform",
                  open && "rotate-180"
                )}
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-[0.98]"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute left-0 z-10 mt-[16px] w-full rounded-b-20 border border-grey/20 bg-white py-2.5 text-sm text-grey shadow-lg">
              <>
                {value.length > 1 && (
                  <>
                    <span className="block px-[30px] text-xs">Selected:</span>
                    <ul className="border-b border-grey/20">
                      {value.slice(1).map((item) => (
                        <li
                          className="relative flex w-full cursor-pointer select-none py-2.5 px-[30px] font-medium text-purple-dark hover:bg-purple-light/20"
                          key={item.id}
                          onClick={() =>
                            setForm((prevValues) => ({
                              ...prevValues,
                              [name]: [
                                ...(prevValues as any)[name]?.filter(
                                  (filteredItem: any) =>
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
                      onClick={() => setQuery("")}
                    >
                      {({ selected }) => (
                        <span
                          className={clsx(
                            "block truncate",
                            selected && "font-medium text-purple-dark"
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
