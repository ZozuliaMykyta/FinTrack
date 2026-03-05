import UserInfo from "@/components/profile/UserInfo";
import React from "react";

const page: React.FC = () => {
  return (
    <div className="container mt-10">
      <h3 className="text-dark-blue font-poppins text-[24px] leading-[0.48px] font-medium">
        My Profile
      </h3>
      <div className="flex justify-between items-start mt-10">
        <UserInfo />
      </div>
    </div>
  );
};

export default page;
