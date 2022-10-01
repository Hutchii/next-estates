import type { NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import Image from "next/future/image";
import { useState, Fragment } from "react";
import { Combobox, Transition } from "@headlessui/react";
import clsx from "clsx";

import Arrow from "../../public/svg/arrow.svg";
import Location from "../../public/svg/location.svg";
import Search from "../../public/svg/search.svg";

const locationOptions = [
  { id: 1, name: "Select location" },
  { id: 2, name: "Arizona" },
  { id: 3, name: "California" },
  { id: 4, name: "New York" },
  { id: 5, name: "Texas" },
  { id: 6, name: "Washington" },
];

const ComboBox = () => {
  const [selected, setSelected] = useState(locationOptions[0]);
  const [query, setQuery] = useState("");

  const filteredPeople =
    query === ""
      ? locationOptions
      : locationOptions.filter((item) =>
          item.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <Combobox
      value={selected}
      onChange={setSelected}
      as="div"
      className="border-b border-grey/20 pb-4"
    >
      <div className="relative flex cursor-default items-center">
        <Location className="mr-2.5 -mt-1" />
        <Combobox.Input
          className="w-full text-sm text-grey outline-none"
          displayValue={(person: typeof locationOptions[0]) => person.name}
          onChange={(event) => setQuery(event.target.value)}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center p-2.5">
          <Arrow aria-hidden="true" />
        </Combobox.Button>
      </div>
      <Transition
        as={Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        afterLeave={() => setQuery("")}
      >
        <Combobox.Options className="absolute left-0 z-10 mt-[16px] w-full rounded-b-20 border border-grey/20 bg-white py-2.5 text-sm text-grey shadow-lg">
          {filteredPeople.length === 0 && query !== "" ? (
            <div className="relative cursor-default select-none py-2.5 px-[30px]">
              Nothing found.
            </div>
          ) : (
            filteredPeople.map((person, index) => (
              <Combobox.Option
                key={person.id}
                className={({ active }) =>
                  clsx(
                    "relative cursor-pointer select-none py-2.5 px-[30px] hover:bg-purple-light/20",
                    active &&
                      index === filteredPeople.length - 1 &&
                      "rounded-b-20"
                  )
                }
                value={person}
              >
                {({ selected }) => (
                  <span
                    className={`block truncate ${
                      selected ? "font-medium text-purple-dark" : ""
                    }`}
                  >
                    {person.name}
                  </span>
                )}
              </Combobox.Option>
            ))
          )}
        </Combobox.Options>
      </Transition>
    </Combobox>
  );
};

const Home: NextPage = () => {
  // const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Estates</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative mt-10">
        <Image
          src="/images/home-main.jpg"
          alt="Estate"
          width={1280}
          height={500}
          priority
          className="absolute top-0 left-0 block h-full rounded-40 object-cover"
        />
        <div className="relative z-10 p-[30px] pt-[60px]">
          <h1 className="text-2xl font-bold text-white">
            Find your perfect space!
          </h1>
          <p className="mt-2.5 text-md font-normal leading-relaxed text-grey-light">
            Discover & Book unique spaces for your upcoming activity.
          </p>
          <div className="relative mt-10 space-y-5 rounded-40 bg-white p-6 pt-10">
            <ComboBox />
            <button className="btn-primary w-full justify-center">
              <Search />
              Search
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

// const AuthShowcase: React.FC = () => {
//   const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery();

//   const { data: sessionData } = useSession();

//   return (
//     <div className="flex flex-col items-center justify-center gap-2">
//       {sessionData && (
//         <p className="text-2xl text-blue-500">
//           Logged in as {sessionData?.user?.name}
//         </p>
//       )}
//       {secretMessage && (
//         <p className="text-2xl text-blue-500">{secretMessage}</p>
//       )}
//       <button
//         className="border-black bg-violet-50 hover:bg-violet-100 shadow-lg' rounded-md border px-4 py-2 text-xl"
//         onClick={sessionData ? () => signOut() : () => signIn()}
//       >
//         {sessionData ? "Sign out" : "Sign in"}
//       </button>
//     </div>
//   );
// };

// type TechnologyCardProps = {
//   name: string;
//   description: string;
//   documentation: string;
// };

// const TechnologyCard = ({
//   name,
//   description,
//   documentation,
// }: TechnologyCardProps) => {
//   return (
//     <section className="border-gray-500 flex flex-col justify-center rounded border-2 p-6 shadow-xl duration-500 motion-safe:hover:scale-105">
//       <h2 className="text-gray-700 text-lg">{name}</h2>
//       <p className="text-gray-600 text-sm">{description}</p>
//       <a
//         className="text-violet-500 mt-3 text-sm underline decoration-dotted underline-offset-2"
//         href={documentation}
//         target="_blank"
//         rel="noreferrer"
//       >
//         Documentation
//       </a>
//     </section>
//   );
// };
