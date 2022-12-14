import Link from "next/link";
import Hamburger from "hamburger-react";
import { RefObject, useEffect, useRef, useState } from "react";
import Image from "next/future/image";
import clsx from "clsx";

import User from "../../public/svg/user.svg";
import AddCircle from "../../public/svg/add-circle.svg";
import Upgrade from "../../public/svg/upgrade.svg";
import Settings from "../../public/svg/settings.svg";
import SignOut from "../../public/svg/sign-out.svg";
import SignIn from "../../public/svg/sign-in.svg";
import Arrow from "../../public/svg/arrow.svg";
import { signIn, signOut, useSession } from "next-auth/react";
import { Session } from "next-auth";

const useOutsideClick = (ref: RefObject<HTMLButtonElement>, fn: () => void) => {
  const handleClick = (e: Event) => {
    const target = e.target as HTMLElement;
    if (ref.current && !ref.current.contains(target.closest("button"))) fn();
  };
  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};

const Profile = ({ session }: { session: Session }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLButtonElement>(null);
  useOutsideClick(profileRef, () => setIsProfileOpen(false));

  return (
    <li className="lg:relative lg:order-4 lg:ml-10">
      <button
        ref={profileRef}
        onClick={() => setIsProfileOpen((p) => !p)}
        className="flex w-full items-center gap-5 border-b border-grey/20 py-5 text-left lg:w-[unset] lg:gap-0 lg:border-none lg:p-0 lg:text-right"
      >
        <Image
          src={session.user?.image || "/images/avatar.png"}
          alt="Avatar"
          width={80}
          height={80}
          priority
          className="rounded-full lg:order-2 lg:h-11 lg:w-11"
        />
        <div className="lg:mr-4">
          <p className="text-md font-medium lg:text-xs">{session.user?.name}</p>
          <p className="mt-1 text-sm text-grey lg:mt-0 lg:text-xs">
            Premium account
          </p>
        </div>
        <div className="hidden lg:order-3 lg:ml-1 lg:block">
          <Arrow
            className={clsx(
              "h-6 w-6 transition-transform",
              isProfileOpen && "rotate-180"
            )}
          />
        </div>
      </button>
      <ul
        className={clsx(
          "transition-all lg:pointer-events-none lg:absolute lg:right-0 lg:top-[60px] lg:scale-95 lg:rounded-10 lg:bg-white lg:text-xs lg:opacity-0 lg:shadow-lg",
          isProfileOpen && "lg:pointer-events-auto lg:scale-100 lg:opacity-100"
        )}
      >
        <li>
          <a
            href="profile/add-new-estate"
            className="flex w-full cursor-pointer items-center gap-5 py-4 font-medium lg:w-full lg:justify-end lg:pr-5 lg:pl-10 lg:hover:rounded-t-10 lg:hover:bg-purple-light/20"
          >
            <User className="lg:order-2 lg:h-6 lg:w-6" />
            Estates
          </a>
        </li>
        <li>
          <a className="flex w-full cursor-pointer items-center gap-5 py-4 font-medium lg:justify-end lg:pr-5 lg:pl-10 lg:hover:bg-purple-light/20">
            <Settings className="lg:order-2 lg:h-6 lg:w-6" />
            Settings
          </a>
        </li>
        <li>
          <a className="flex w-full cursor-pointer items-center gap-5 py-4 font-medium lg:justify-end lg:pr-5 lg:pl-10 lg:hover:bg-purple-light/20">
            <Settings className="lg:order-2 lg:h-6 lg:w-6" />
            Messages
          </a>
        </li>
        <li className="lg:border-t lg:border-grey/10">
          <button
            onClick={() => signOut()}
            className="flex w-full items-center gap-5 py-4 font-medium lg:justify-end lg:pr-5 lg:pl-10 lg:hover:rounded-b-10 lg:hover:bg-purple-light/20"
          >
            <SignOut className="lg:order-2 lg:h-6 lg:w-6" />
            Sign Out
          </button>
        </li>
      </ul>
    </li>
  );
};

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data: session, status } = useSession();
  return (
    <header className="flex h-20 items-center justify-between text-md text-purple-dark">
      <div
        className={clsx(
          "absolute top-0 left-0 z-20 h-screen w-full -translate-x-full bg-grey-light transition-transform lg:hidden",
          isDropdownOpen && "translate-x-0"
        )}
      />
      <Link href="/" className="z-20 text-md font-bold">
        ESTATES
      </Link>
      <div className="z-20 lg:hidden">
        <Hamburger
          toggled={isDropdownOpen}
          toggle={setIsDropdownOpen}
          color="#1c1840"
          rounded
        />
      </div>
      <ul
        className={clsx(
          "absolute top-20 left-0 z-20 flex w-full -translate-x-full flex-col border-t border-grey/20 px-[30px] transition-transform lg:static lg:translate-x-0 lg:flex-row lg:items-center lg:justify-end lg:border-none",
          isDropdownOpen && "translate-x-0"
        )}
      >
        {session && (
          <>
            <li className="order-2 border-t border-grey/20 lg:border-none">
              <button className="lg:btn-secondary flex w-full items-center gap-5 py-5 pb-2.5 font-medium lg:w-[unset] lg:gap-2.5 lg:p-0 lg:pl-6 lg:pr-[30px]">
                <AddCircle className="lg:h-[18px] lg:w-[18px] lg:fill-purple" />
                Add new estate
              </button>
            </li>
            <li className="order-3 lg:ml-5">
              <button className="lg:btn-primary flex w-full items-center gap-5 py-5 font-medium lg:w-[unset] lg:gap-2.5 lg:p-0 lg:pl-6 lg:pr-[30px]">
                <Upgrade className="lg:h-[18px] lg:w-[18px] lg:fill-white" />
                Upgrade now
              </button>
            </li>
            <Profile session={session} />
          </>
        )}
        {!session && status !== "loading" && (
          <li>
            <button
              onClick={() => signIn()}
              className="lg:btn-primary flex w-full items-center gap-5 py-4 font-medium"
            >
              <SignIn className="lg:h-6 lg:w-6 lg:fill-white" />
              Sign In
            </button>
          </li>
        )}
      </ul>
    </header>
  );
};

export default Header;
