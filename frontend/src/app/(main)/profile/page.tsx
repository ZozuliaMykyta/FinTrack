import UserInfo from "@/components/profile/UserInfo";
import React from "react";

const page: React.FC = () => {
  return (
    <div className="container flex justify-between items-start">
      <h3>My Profile</h3>
      <UserInfo />
    </div>
  );
};

export default page;
