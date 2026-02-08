import Image from "next/image";
import Link from "next/link";
import React from "react";
import notifiaction from "@/assets/img/icons/notifiaction.svg";
import profile from "@/assets/img/icons/profile.svg";

const Header: React.FC = () => {
  const navLinks = [
    { name: "Dashboard", href: "/dashboard", id: "dashboard" },
    { name: "Transactions", href: "/transactions", id: "transactions" },
    { name: "Budgets", href: "/budgets", id: "budgets" },
    { name: "Goals", href: "/goals", id: "goals" },
    { name: "Reports", href: "/reports", id: "reports" },
  ];
  const navProfil = [
    {
      id: "notifiaction",
      img: notifiaction,
      alt: "notifiaction button",
      href: "notifiaction",
    },
    {
      id: "profile",
      img: profile,
      alt: "profile button",
      href: "profile",
    },
  ];
  return (
    <div className="container py-3">
      <Image
        src="/assets/img/icons/logo.svg"
        alt="FinTrack Logo"
        width={127}
        height={43}
      />
      <ul>
        {navLinks.map((link) => (
          <li key={link.id}>
            <Link href={link.href}>{link.name}</Link>
          </li>
        ))}
      </ul>
      <div>
        {navProfil.map((item) => (
          <Link key={item.id} href={item.href}>
            <Image src={item.img} alt={item.alt} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Header;
