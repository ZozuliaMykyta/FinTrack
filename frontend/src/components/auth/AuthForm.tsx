import { usePathname } from "next/navigation";
import React from "react";

const AuthForm: React.FC = () => {
  const pathName = usePathname();
  return (
    <form className="flex flex-col">
      {pathName === "/signUp" && (
        <input type="text" name="name" placeholder="Name" />
      )}
      <input type="email" name="email" placeholder="Email" />
      <input type="password" name="password" placeholder="Password" />
      {pathName === "/signUp" && (
        <input
          type="password"
          name="confirm password"
          placeholder="Confirm Password"
        />
      )}
      <button type="submit" className="cursor-pointer">
        {pathName === "/signUp" ? "Sign Up" : "Sign In"}
      </button>
    </form>
  );
};

export default AuthForm;
