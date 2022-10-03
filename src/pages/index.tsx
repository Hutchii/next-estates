// import { signIn, signOut, useSession } from "next-auth/react";
// import { trpc } from "../utils/trpc";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/future/image";
import { useState } from "react";
import ComboBox from "../UI/ComboBox";
import ListBox from "../UI/ListBox";
import InputCurrency from "../UI/Input";

import Location from "../../public/svg/location.svg";
import Search from "../../public/svg/search.svg";
import User from "../../public/svg/user.svg";

export type SelectOptions = {
  id: number;
  name: string;
  value: string;
};

export type FiltersForm = {
  location: SelectOptions[];
  guests: SelectOptions;
  minPrice: string;
  maxPrice: string;
};

const locationOptions = [
  { id: 1, name: "Arizona", value: "arizona" },
  { id: 2, name: "California", value: "california" },
  { id: 3, name: "New York", value: "new york" },
  { id: 4, name: "Texas", value: "texas" },
  { id: 5, name: "Washington", value: "washington" },
];
const guestsOptions = [
  { id: 1, name: "1", value: "0-1" },
  { id: 2, name: "2", value: "0-2" },
  { id: 3, name: "3 to 4", value: "3-4" },
  { id: 4, name: "5 to 6", value: "5-6" },
  { id: 5, name: "7 to 10", value: "7-10" },
  { id: 6, name: "More than 10", value: "11-100" },
];

export const filtersFormInitial = {
  location: [{ id: 0, name: "", value: "" }],
  guests: { id: 0, name: "", value: "" },
  minPrice: "",
  maxPrice: "",
};

const Home: NextPage = () => {
  const [form, setForm] = useState(filtersFormInitial);
  console.log(form);
  // const hello = trpc.example.hello.useQuery({ text: "from tRPC" });
  return (
    <>
      <Head>
        <title>Estates</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative mt-10 -ml-[30px] -mr-[30px] sm:mx-0">
        <Image
          src="/images/home-main.jpg"
          alt="Estate"
          width={1280}
          height={500}
          priority
          className="absolute top-0 left-0 block h-full rounded-40 object-cover"
        />
        <div className="relative z-10 p-[30px] pt-10 sm:pt-20 lg:pb-10 xl:min-h-[450px] xl:px-10 2xl:px-20">
          <h1 className="text-center text-2xl font-bold text-white sm:text-3xl xl:text-4xl">
            Find your perfect space!
          </h1>
          <p className="mt-2.5 text-center text-md font-normal leading-relaxed text-grey-light">
            Discover & Book unique spaces for your upcoming activity.
          </p>
          <div className="relative mt-10 space-y-5 rounded-40 bg-white px-6 pb-8 pt-10 lg:flex lg:flex-wrap lg:items-center lg:gap-5 lg:space-y-0 xl:h-20 xl:flex-nowrap xl:py-0 xl:pr-3 xl:pl-10">
            <div className="flex w-full flex-col gap-5 lg:flex-row lg:items-center xl:flex-[1_1_60%]">
              <div className="border-b border-grey/20 pb-4 lg:relative lg:flex-[1_1_50%] lg:border-none lg:pb-0">
                <ComboBox
                  name="location"
                  placeholder="Locations"
                  options={locationOptions}
                  onChange={setForm}
                  value={form.location as SelectOptions[]}
                  initialValues={filtersFormInitial.location}
                >
                  <Location className="mr-2.5 -mt-0.5 flex" />
                </ComboBox>
              </div>
              <div className="hidden lg:block lg:h-10 lg:w-[1px] lg:bg-grey/50" />
              <div className="border-b border-grey/20 pb-4 lg:relative lg:flex-[1_1_50%] lg:border-none lg:pb-0">
                <ListBox
                  name="guests"
                  placeholder="Number of guests"
                  options={guestsOptions}
                  onChange={setForm}
                  value={form.guests as SelectOptions}
                  initialValues={filtersFormInitial.guests}
                >
                  <User className="mr-2.5 h-[22px] w-[22px] fill-grey" />
                </ListBox>
              </div>
            </div>
            <div className="hidden xl:block xl:h-10 xl:w-[1px] xl:bg-grey/50" />
            <div className="flex w-full flex-col gap-5 lg:flex-row lg:items-center xl:flex-[1_1_40%]">
              <div className="flex items-center gap-2.5 border-b border-grey/20 pb-4 lg:flex-[1_1_50%] lg:border-none lg:pb-0">
                <InputCurrency
                  name="minPrice"
                  placeholder="Price minimum"
                  value={form.minPrice}
                  onChange={setForm}
                />
              </div>
              <div className="hidden lg:block lg:h-10 lg:w-[1px] lg:bg-grey/50" />
              <div className="flex items-center gap-2.5 border-b border-grey/20 pb-4 lg:flex-[1_1_50%] lg:border-none lg:pb-0">
                <InputCurrency
                  name="maxPrice"
                  placeholder="Price maximum"
                  value={form.maxPrice}
                  onChange={setForm}
                />
              </div>
            </div>
            <button className="btn-primary w-full justify-center xl:h-[60px] xl:w-[60px]">
              <span>
                <Search className="ml-1.5 h-6 w-6" />
              </span>
              <span className="xl:hidden">Search</span>
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
