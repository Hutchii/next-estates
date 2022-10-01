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
}: {
  options: { id: number; name: string }[];
  children: React.ReactElement;
  name: string;
  setForm: React.Dispatch<React.SetStateAction<Form>>;
  value: Options;
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
      value={value}
      onChange={(v: Options) => setForm((p) => ({ ...p, [name]: v }))}
      as="div"
      className="border-b border-grey/20 pb-4"
    >
      {({ open }) => (
        <>
          <div className="relative flex cursor-default items-center">
            {children}
            <Combobox.Input
              className={clsx(
                "w-full text-sm text-grey outline-none",
                value.name !== options[0]?.name &&
                  "font-medium text-purple-dark"
              )}
              displayValue={(item: Options) => item.name}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button
              className={clsx(
                "absolute inset-y-0 right-0 flex items-center p-2.5 transition-transform",
                open && "rotate-180"
              )}
            >
              <Arrow aria-hidden="true" />
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
              {filteredOptions.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2.5 px-[30px]">
                  Nothing found.
                </div>
              ) : (
                filteredOptions.map((item, index) => (
                  <Combobox.Option
                    key={item.id}
                    className={({ active }) =>
                      clsx(
                        "relative cursor-pointer select-none py-2.5 px-[30px] hover:bg-purple-light/20",
                        active &&
                          index === filteredOptions.length - 1 &&
                          "rounded-b-20"
                      )
                    }
                    value={item}
                  >
                    <span
                      className={clsx(
                        "block truncate",
                        item.name === value.name &&
                          "font-medium text-purple-dark"
                      )}
                    >
                      {item.name}
                    </span>
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </>
      )}
    </Combobox>
  );
};

export default ComboBox;
