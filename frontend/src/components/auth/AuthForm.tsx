"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdOutlinePerson, MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import IAuth from "@/interfaces/IAuth";
import {
  useGetUserStatusQuery,
  useSignUpUserMutation,
} from "@/lib/services/api";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { setUserData } from "@/lib/features/authSlice";
import { useAppDispatch } from "@/lib/hooks";

const AuthForm: React.FC = () => {
  const [inputTypes, setInputTypes] = useState<{
    password: string;
    confirmPassword: string;
  }>({
    password: "password",
    confirmPassword: "password",
  });
  const [userError, setUserError] = useState<string | null>(null);
  const [userMessage, setUserMessage] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IAuth>();

  const pathName = usePathname();
  const router = useRouter();

  const [signUpUser, { isLoading }] = useSignUpUserMutation();

  const handlePasswordVisibility = (key: keyof typeof inputTypes) => {
    setInputTypes((prevState) => ({
      ...prevState,
      [key]: prevState[key] === "password" ? "text" : "password",
    }));
  };
  const { data } = useGetUserStatusQuery(userId, {
    skip: !userId,
    pollingInterval: 3000,
  });
  useEffect(() => {
    if (data?.isEmailVerified && data?.token) {
      dispatch(setUserData({ user: data.user }));
      localStorage.setItem("token", data.token);
      router.push("/");
    }
  }, [data, router, dispatch]);
  const onSubmit: SubmitHandler<IAuth> = async (data: IAuth) => {
    try {
      const response = await signUpUser({
        email: data.email,
        password: data.password,
        username: data.username,
      }).unwrap();
      if (response) {
        setUserError(null);
        setUserMessage(
          response.message ||
            "Registration successful. Verification email sent.",
        );
        setIsSubmitted(true);
        setUserId(response.userId);
      }
    } catch (error) {
      if (typeof error === "object" && error != null && "status" in error) {
        const fetchError = error as FetchBaseQueryError;

        if (fetchError.status === 409) {
          const errorData = fetchError.data as { message?: string };
          setUserError(errorData?.message || "User already exists");
        } else {
          setUserError("Registration failed. Please try again.");
        }
      } else {
        setUserError("An unexpected error occurred");
      }
    }
  };
  return (
    <>
      {userError && (
        <p className="text-custom-red text-sm mb-3 text-center">{userError}</p>
      )}
      {userMessage && (
        <p className="text-grass-green text-sm mb-3 max-w-40 text-center">
          {userMessage}
        </p>
      )}
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
          </div>
          {errors.email && (
            <p className="text-custom-red text-sm mt-1">
              {errors.email.message}
            </p>
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
        <button type="submit" className="green-btn" disabled={isSubmitted}>
          {isLoading
            ? "Loading..."
            : pathName === "/signUp"
              ? "Sign Up"
              : "Sign In"}
        </button>
      </form>
    </>
  );
};

export default AuthForm;
