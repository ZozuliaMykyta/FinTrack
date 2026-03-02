import { usePathname } from "next/navigation";
import React from "react";
import { MdOutlinePerson, MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

const AuthForm: React.FC = () => {
  const pathName = usePathname();
  return (
    <form className="flex flex-col">
      {pathName === "/signUp" && (
        <div>
          <MdOutlinePerson />
          <input type="text" name="name" placeholder="Name" />
        </div>
      )}
      <div>
        <MdOutlineEmail />
        <input type="email" name="email" placeholder="Email" />
      </div>
      <div>
        <RiLockPasswordLine />
        <input type="password" name="password" placeholder="Password" />
      </div>
      {pathName === "/signUp" && (
        <div>
          <RiLockPasswordLine />
          <input
            type="password"
            name="confirm password"
            placeholder="Confirm Password"
          />
        </div>
      )}
      <button type="submit" className="cursor-pointer">
        {pathName === "/signUp" ? "Sign Up" : "Sign In"}
      </button>
    </form>
  );
};

export default AuthForm;
