import React from "react";

const AuthForm: React.FC = () => {
  return (
    <form>
      <input type="text" />
      <input type="email" name="email" />
      <input type="password" name="password" />
      <input type="password" name="confirm password" />
    </form>
  );
};

export default AuthForm;
