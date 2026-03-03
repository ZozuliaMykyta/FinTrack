"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import HeaderList from "./header/HeaderList";
import HeaderProfile from "./header/HeaderProfile";

const Header: React.FC = () => {
  const [isOpenBurger, setIsOpenBurger] = useState<boolean>(false);
  return (
    <div className="bg-white">
      <div className="container py-3 flex justify-between items-center gap-4">
        <Link href="/">
          <Image
            src="/assets/img/icons/logo.svg"
            alt="FinTrack Logo"
            width={127}
            height={43}
          />
        </Link>
        <HeaderList />
        <HeaderProfile />
        <button
          onClick={() => setIsOpenBurger(!isOpenBurger)}
          className="relative flex flex-col items-center justify-center gap-2 lg:hidden z-50 w-9 h-9"
          aria-label="menu button"
        >
          <span
            className={`block h-0.5 w-9 bg-gray-600 transition-transform duration-300 ${
              isOpenBurger ? "rotate-45 translate-y-2.5" : ""
            }`}
          ></span>
          <span
            className={`block h-0.5 w-9 bg-gray-600 transition-opacity duration-300 ${
              isOpenBurger ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block h-0.5 w-9 bg-gray-600 transition-transform duration-300 ${
              isOpenBurger ? "-rotate-45 -translate-y-2.5" : ""
            }`}
          ></span>
        </button>
        <div
          className={`${
            isOpenBurger ? "translate-x-0" : "translate-x-[110%]"
          } fixed top-0 right-0 w-full h-full bg-black z-20 transition-all duration-500 flex flex-col items-center justify-center text-center`}
        >
          <HeaderList isOpenBurger={isOpenBurger} />
          <HeaderProfile isOpenBurger={isOpenBurger} />
        </div>
      </div>
    </div>
  );
};

export default Header;
