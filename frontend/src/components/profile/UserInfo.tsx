import Image from "next/image";
import React from "react";

const UserInfo: React.FC = () => {
  return (
    <div>
      <Image src="" alt="Profile image"></Image>
      <h4>Name: </h4>
      <h5>Email: </h5>
      <div>
        <button>Edit Profile</button>
        <button>Change Password</button>
      </div>
    </div>
  );
};

export default UserInfo;
