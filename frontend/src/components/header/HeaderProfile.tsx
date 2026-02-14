import React from "react";
import Notifiaction from "@/assets/img/icons/notifiaction.svg";
import Profile from "@/assets/img/icons/profile.svg";
import Link from "next/link";

type HeaderProfileProps = {
  isOpenBurger?: boolean;
};

const HeaderProfile: React.FC<HeaderProfileProps> = ({ isOpenBurger }) => {
  const navProfil = [
    {
      id: "notifiaction",
      img: (
        <Notifiaction className="text-grey group-hover:text-grass-green transition-colors duration-500" />
      ),
      alt: "notifiaction button",
      href: "notifiaction",
    },
    {
      id: "profile",
      img: (
        <Profile className="text-grey group-hover:text-grass-green transition-colors duration-500" />
      ),
      alt: "profile button",
      href: "profile",
    },
  ];
  return (
    <div
      className={`lg:flex justify-between items-center gap-3.5 lg:visible ${isOpenBurger ? "visible mt-10 flex-row flex" : "hidden"}`}
    >
      {navProfil.map((item) => (
        <Link key={item.id} href={item.href} className="group">
          {item.img}
        </Link>
      ))}
    </div>
  );
};

export default HeaderProfile;
