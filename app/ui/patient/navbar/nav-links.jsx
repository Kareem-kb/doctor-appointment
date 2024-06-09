"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/public/images/logo.png";
import UserAccount from "./user-account";
import { usePathname } from "next/navigation";
import { MdHome, MdPerson } from "react-icons/md";
import clsx from "clsx";

const links = [
  { name: "Home", href: "/patient/dashboard", icon: MdHome },
  { name: "Personal", href: "/patient/personal", icon: MdPerson },
];

export default function Navlinks() {
  const pathname = usePathname();

  return (
    <div
      className="
      flex w-full flex-wrap items-center justify-between border px-3"
    >
      <div>
        <Image
          src={logo}
          width={200}
          height={100} // adjust height to match the logo aspect ratio
          priority
          alt="test logo"
        />
      </div>
      <div className="flex justify-center ">
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <div
              className={clsx(
                "flex  grow items-center justify-center  rounded-md bg-gray-50  text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
                {
                  "bg-sky-100 text-blue-600": pathname === link.href,
                },
              )}
            >
              <Link
                key={link.name}
                href={link.href}
                className="flex w-full flex-col items-center "
              >
                <LinkIcon className="size-9" />
                <p className="hidden md:block">{link.name}</p>
              </Link>
            </div>
          );
        })}
      </div>
      <div></div>{" "}
      <div>
        <UserAccount className="ml-auto" />
      </div>
    </div>
  );
}
