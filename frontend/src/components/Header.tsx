"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Notifiaction from "@/assets/img/icons/notifiaction.svg";
import Profile from "@/assets/img/icons/profile.svg";

const Header: React.FC = () => {
  const [isOpenBurger, setIsOpenBurger] = useState<boolean>(false);
  const navLinks = [
    { name: "Dashboard", href: "/dashboard", id: "dashboard" },
    { name: "Transactions", href: "/transactions", id: "transactions" },
    { name: "Budgets", href: "/budgets", id: "budgets" },
    { name: "Goals", href: "/goals", id: "goals" },
    { name: "Reports", href: "/reports", id: "reports" },
  ];
  const navProfil = [
    {
      id: "notifiaction",
      img: (
        <Notifiaction className="text-grey group-hover:text-grass-green transition-colors duration-500" />
      ),
      alt: "notifiaction button",
      href: "notifiaction",
    },
    {
      id: "profile",
      img: (
        <Profile className="text-grey group-hover:text-grass-green transition-colors duration-500" />
      ),
      alt: "profile button",
      href: "profile",
    },
  ];
  return (
    <div className="container py-3 flex justify-between items-center gap-4">
      <Link href="/">
        <Image
          src="/assets/img/icons/logo.svg"
          alt="FinTrack Logo"
          width={127}
          height={43}
        />
      </Link>
      <ul className="flex justify-between items-center gap-7">
        {navLinks.map((link) => (
          <li key={link.id}>
            <Link
              href={link.href}
              className="underline-animate pb-0.5 text-[16px] tracking-[0.32px] text-grey hover:text-grass-green transition-all duration-500"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center gap-3.5">
        {navProfil.map((item) => (
          <Link key={item.id} href={item.href} className="group">
            {item.img}
          </Link>
        ))}
      </div>
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
    </div>
  );
};

export default Header;
