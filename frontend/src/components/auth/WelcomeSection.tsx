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
      className="py-10 px-6 rounded-tl-[20px] rounded-bl-[20px]"
    >
      <Image
        src="/assets/img/icons/auth-logo.svg"
        alt="Welcome Logo"
        width={96}
        height={32}
      />
      <h1>{pathName === "/signUp" ? signUpInfo.title : signInInfo.title}</h1>
      <h5>{pathName === "/signUp" ? signUpInfo.desc : signInInfo.desc}</h5>
      <Link href={pathName === "/signUp" ? signInInfo.path : signUpInfo.path}>
        {pathName === "/signUp" ? signInInfo.link : signUpInfo.link}
      </Link>
    </div>
  );
};

export default WelcomeSection;
