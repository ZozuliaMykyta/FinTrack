"use client";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { MdOutlinePerson, MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import IAuth from "@/interfaces/IAuth";

const AuthForm: React.FC = () => {
  const [inputTypes, setInputTypes] = useState<{
    password: string;
    confirmPassword: string;
  }>({
    password: "password",
    confirmPassword: "password",
  });
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IAuth>({ mode: "onBlur" });

  const pathName = usePathname();

  const handlePasswordVisibility = (key: keyof typeof inputTypes) => {
    setInputTypes((prevState) => ({
      ...prevState,
      [key]: prevState[key] === "password" ? "text" : "password",
    }));
  };

  const onSubmit: SubmitHandler<IAuth> = (data: IAuth) => {};

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 justify-center items-center"
    >
      {pathName === "/signUp" && (
        <div>
          <div className="relative">
            <MdOutlinePerson className="auth-input-icon" />
            <input
              type="text"
              {...register("username", {
                required: "Enter your name",
                minLength: { value: 2, message: "At least 2 characters" },
                pattern: {
                  value: /^[A-Za-z\s\-]+$/,
                  message: "Only letters, spaces and hyphens allowed",
                },
              })}
              placeholder="Name"
              className={`auth-input ${errors.username ? "border-custom-red! focus:outline-none" : ""}`}
            />
          </div>
          {errors.username && (
            <p className="text-custom-red text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>
      )}
      <div>
        <div className="relative">
          <MdOutlineEmail className="auth-input-icon" />
          <input
            type="email"
            {...register("email", {
              required: "Enter your email",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Enter a valid email address",
              },
            })}
            placeholder="Email"
            className="auth-input"
          />
          {errors.email && (
            <p className="text-custom-red text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>
        {errors.email && (
          <p className="text-custom-red text-sm mt-1">{errors.email.message}</p>
        )}
      </div>
      <div>
        <div className="relative">
          <RiLockPasswordLine className="auth-input-icon" />
          <input
            type={inputTypes.password}
            {...register("password", {
              required: "Enter a password",
              minLength: { value: 8, message: "At least 8 characters" },
              pattern: {
                value: /^(?=.*\d).+$/,
                message: "Password must contain at least one digit",
              },
            })}
            placeholder="Password"
            className={`auth-input ${errors.password ? "border-custom-red" : ""}`}
          />
          {inputTypes.password === "password" ? (
            <IoEyeOutline
              className="absolute top-[50%] -translate-y-[50%] right-2.5 text-[20px]"
              onClick={() => handlePasswordVisibility("password")}
            />
          ) : (
            <IoEyeOffOutline
              className="absolute top-[50%] -translate-y-[50%] right-2.5 text-[20px]"
              onClick={() => handlePasswordVisibility("password")}
            />
          )}
        </div>
        {errors.password && (
          <p className="text-custom-red text-sm mt-1">
            {errors.password.message}
          </p>
        )}
      </div>
      {pathName === "/signUp" && (
        <div>
          <div className="relative">
            <RiLockPasswordLine className="auth-input-icon" />
            <input
              type={inputTypes.confirmPassword}
              {...register("confirmPassword", {
                required: "Confirm your password",
                validate: (value) =>
                  value === getValues("password") || "Passwords do not match",
              })}
              placeholder="Confirm Password"
              className="auth-input"
            />
            {inputTypes.confirmPassword === "password" ? (
              <IoEyeOutline
                className="absolute top-[50%] -translate-y-[50%] right-2.5 text-[20px]"
                onClick={() => handlePasswordVisibility("confirmPassword")}
              />
            ) : (
              <IoEyeOffOutline
                className="absolute top-[50%] -translate-y-[50%] right-2.5 text-[20px]"
                onClick={() => handlePasswordVisibility("confirmPassword")}
              />
            )}
          </div>
          {errors.confirmPassword && (
            <p className="text-custom-red text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      )}
      {pathName === "/signIn" && (
        <Link className="text-[#64748B] text-[14px]" href="#!">
          Forgot your password?
        </Link>
      )}
      <button type="submit" className="green-btn">
        {pathName === "/signUp" ? "Sign Up" : "Sign In"}
      </button>
    </form>
  );
};

export default AuthForm;
