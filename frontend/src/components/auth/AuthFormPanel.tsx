"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaGoogle } from "react-icons/fa";
import AuthForm from "./AuthForm";

const AuthFormPanel: React.FC = () => {
  const pathName = usePathname();
  const signUpInfo = {
    title: "Create account",
    desc: "or use your email for registration",
    link: "sign up",
  };
  const signInInfo = {
    title: "Sign in to FinTrack",
    desc: "or use your account",
    link: "sign in",
    password: "Forgot your password?",
  };
  return (
    <div className="flex justify-center items-center flex-col gap-5 shadow-[0_10px_40px_0_rgba(0,0,0,0.15)] min-h-[50vh] rounded-tr-[20px] rounded-br-[20px] py-14 px-12">
      <h2 className="text-[#333] leading-10 font-poppins text-[32px] font-bold">
        {pathName === "/signUp" ? signUpInfo.title : signInInfo.title}
      </h2>
      <Link href="#!">
        <FaGoogle className="text-[rgba(102,102,102,1)] text-3xl" />
      </Link>
      <h6 className="leading-5 text-[#999] text-[12px] font-poppins">
        {pathName === "/signUp" ? signUpInfo.desc : signInInfo.desc}
      </h6>
      <AuthForm />
    </div>
  );
};

export default AuthFormPanel;
