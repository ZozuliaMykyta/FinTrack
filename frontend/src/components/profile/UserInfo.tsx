import Image from "next/image";
import React from "react";

const UserInfo: React.FC = () => {
  return (
    <div
      className="rounded-xl bg-white p-5 flex flex-col items-center"
      style={{ boxShadow: "0 6px 18px 0 rgba(2,6,23,0.10)" }}
    >
      <Image
        src="/some-image.jpg"
        alt="Profile image"
        width={64}
        height={64}
      ></Image>
      <h4 className="text-dark-blue text-[18px] font-medium leading-[0.36px] mt-5">
        Name:{" "}
      </h4>
      <h5 className="text-grey leading-[0.28px] font-medium text-[14px] mt-7">
        Email:{" "}
      </h5>
      <div className="flex justify-center items-center gap-3 mt-6">
        <button className="green-btn py-2.5! px-5!">Edit Profile</button>
        <button className="bg-[#E2E8F0] rounded-lg py-2.5 px-5! text-dark-blue font-medium btn-anim">
          Change Password
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
