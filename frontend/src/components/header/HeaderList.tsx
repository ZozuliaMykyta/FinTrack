import Link from "next/link";
import React from "react";

type HeaderProfileProps = {
  isOpenBurger?: boolean;
};

const HeaderList: React.FC<HeaderProfileProps> = ({ isOpenBurger }) => {
  const navLinks = [
    { name: "Dashboard", href: "/dashboard", id: "dashboard" },
    { name: "Transactions", href: "/transactions", id: "transactions" },
    { name: "Budgets", href: "/budgets", id: "budgets" },
    { name: "Goals", href: "/goals", id: "goals" },
    { name: "Reports", href: "/reports", id: "reports" },
  ];
  return (
    <ul
      className={`lg:flex justify-between items-center gap-7 lg:visible ${isOpenBurger ? "visible" : "hidden"}`}
    >
      {navLinks.map((link) => (
        <li key={link.id} className={`${isOpenBurger ? "not-first:mt-3" : ""}`}>
          <Link
            href={link.href}
            className="underline-animate pb-0.5 text-[16px] tracking-[0.32px] text-grey hover:text-grass-green transition-all duration-500"
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default HeaderList;
