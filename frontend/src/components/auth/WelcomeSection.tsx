"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const WelcomeSection: React.FC = () => {
  const pathName = usePathname();

  const signUpInfo = {
    title: "Welcome Back!",
    desc: "Log in to manage your finances.",
    link: "sign in",
    path: "/signIn",
  };
  const signInInfo = {
    title: "Hello, Friend!",
    desc: "Enter your personal details and start journey with us",
    link: "sign up",
    path: "/signUp",
  };
  return (
    <div
      style={{
        background: "linear-gradient(333deg, #185A4D 29.38%, #4DD0B1 100%)",
      }}
      className="relative py-10 px-6 rounded-tl-[20px] rounded-bl-[20px] text-center flex justify-center items-center flex-col min-h-[50vh] "
    >
      <Image
        src="/assets/img/icons/auth-logo.svg"
        alt="Welcome Logo"
        width={96}
        height={32}
        className="absolute top-10 left-[50%] translate-x-[-50%]"
      />
      <h1 className="text-white leading-11 font-bold text-4xl">
        {pathName === "/signUp" ? signUpInfo.title : signInInfo.title}
      </h1>
      <h5 className="my-3 text-[rgba(255,255,255,0.90)] text-[14px] leading-5">
        {pathName === "/signUp" ? signUpInfo.desc : signInInfo.desc}
      </h5>
      <Link
        className="rounded-lg bg-[#00B894] text-white py-2.5 px-12 font-medium transition-transform duration-150 ease-in-out hover:scale-105 focus-visible:scale-105 hover:shadow-lg active:scale-95 active:shadow"
        href={pathName === "/signUp" ? signInInfo.path : signUpInfo.path}
      >
        {pathName === "/signUp" ? signInInfo.link : signUpInfo.link}
      </Link>
    </div>
  );
};

export default WelcomeSection;
