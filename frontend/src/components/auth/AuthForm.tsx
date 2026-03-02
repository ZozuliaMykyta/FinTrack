import { usePathname } from "next/navigation";
import React, { useRef, useState } from "react";
import { MdOutlinePerson, MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const AuthForm: React.FC = () => {
  const [inputTypes, setInputTypes] = useState<{
    password: string;
    confirmPassword: string;
  }>({
    password: "password",
    confirmPassword: "password",
  });
  const pathName = usePathname();

  const handlePasswordVisibility = (key: keyof typeof inputTypes) => {
    setInputTypes((prevState) => ({
      ...prevState,
      [key]: prevState[key] === "password" ? "text" : "password",
    }));
  };
  return (
    <form className="flex flex-col gap-5 justify-center items-center">
      {pathName === "/signUp" && (
        <div className="relative">
          <MdOutlinePerson className="auth-input-icon" />
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="auth-input"
          />
        </div>
      )}
      <div className="relative">
        <MdOutlineEmail className="auth-input-icon" />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="auth-input"
        />
      </div>
      <div className="relative">
        <RiLockPasswordLine className="auth-input-icon" />
        <input
          type={inputTypes.password}
          name="password"
          placeholder="Password"
          className="auth-input"
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
      {pathName === "/signUp" && (
        <div className="relative">
          <RiLockPasswordLine className="auth-input-icon" />
          <input
            type={inputTypes.confirmPassword}
            name="confirm password"
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
      )}
      <button type="submit" className="green-btn">
        {pathName === "/signUp" ? "Sign Up" : "Sign In"}
      </button>
    </form>
  );
};

export default AuthForm;
