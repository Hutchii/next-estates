import Link from "next/link";
import Hamburger from "hamburger-react";
import { useState } from "react";
import Image from "next/future/image";
import clsx from "clsx";

import User from "../../public/svg/user.svg";
import AddCircle from "../../public/svg/add-circle.svg";
import Upgrade from "../../public/svg/upgrade.svg";
import Settings from "../../public/svg/settings.svg";
import SignOut from "../../public/svg/sign-out.svg";

const Header = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <header className="flex h-20 items-center justify-between text-md text-purple-dark">
      <div
        className={clsx(
          "absolute top-0 left-0 z-10 h-screen w-full -translate-x-full bg-grey-light transition-transform",
          isOpen && "translate-x-0"
        )}
      />
      <Link href="/" className="z-20 text-md font-bold">
        ESTATES
      </Link>
      <div className="z-20">
        <Hamburger toggled={isOpen} toggle={setOpen} color="#1c1840" rounded />
      </div>
      <ul
        className={clsx(
          "absolute top-20 left-0 z-20 flex w-full -translate-x-full flex-col px-[30px] transition-transform",
          isOpen && "translate-x-0"
        )}
      >
        <li className="order-2">
          <button className="sm:btn-primary flex w-full items-center gap-5 py-5 font-medium">
            <AddCircle />
            Add new state
          </button>
        </li>
        <li className="order-3">
          <button className="sm:btn-primary flex w-full items-center gap-5 py-5 font-medium">
            <Upgrade />
            Upgrade now
          </button>
        </li>
        <li>
          <button className="flex w-full items-center gap-5 border-b border-grey/20 pb-10 text-left">
            <Image
              src="/images/avatar.png"
              alt="Avatar"
              width={80}
              height={80}
              priority
            />
            <div>
              <p className="text-md font-medium">Domino Johnson</p>
              <p className="mt-1 text-sm text-grey">Premium account</p>
            </div>
          </button>
          <ul className="mt-5">
            <li className="">
              <button className="sm:btn-primary flex w-full items-center gap-5 py-5 font-medium">
                <User />
                Profile
              </button>
            </li>
            <li className="">
              <button className="sm:btn-primary flex w-full items-center gap-5 py-5 font-medium">
                <Settings />
                Settings
              </button>
            </li>
            <li className="">
              <button className="sm:btn-primary flex w-full items-center gap-5 py-5 font-medium">
                <SignOut />
                Sign Out
              </button>
            </li>
          </ul>
        </li>
        <div className="my-2.5 h-[1px] w-full bg-grey/20" />
      </ul>
    </header>
  );
};

export default Header;
