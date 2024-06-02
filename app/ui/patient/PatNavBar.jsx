"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/images/logo.png";
import { usePathname } from "next/navigation";
import { MdHome } from "react-icons/md";
import { BiSolidDetail } from "react-icons/bi";
import { IoSearchSharp } from "react-icons/io5";
import clsx from "clsx";
import UserAccount from "@/app/ui/patient/navbar/user-account";

const links = [
    { name: "Home", href: "/patient/dashboard", icon: MdHome },
    { name: "Search", href: "/patient/search", icon: IoSearchSharp },
    { name: "Personal", href: "/patient/profile", icon: BiSolidDetail },
];

export default function PatNavBar() {
  const pathname = usePathname();

  return (
    <div
      className=" flex
      w-full flex-wrap items-center justify-between bg-white p-2 shadow-md "
    >
      <div>
        <Link href={"/hospital/dashboard"}>
          <Image
            className=" cursor-pointer"
            src={logo}
            height={100}
            width={100}
            alt="Test Logo"
          />
        </Link>
      </div>
      <div className="flex justify-center gap-6">
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <div
              key={link.name}
              className={clsx(
                "flex grow items-center justify-center gap-2 rounded-md bg-gray-50 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start",
                {
                  "bg-sky-100 text-blue-600": pathname === link.href,
                },
              )}
            >
              <Link
                key={link.name}
                href={link.href}
                className="flex flex-col items-center p-3 "
              >
                <LinkIcon className="size-5" />
              </Link>
            </div>
          );
        })}
      </div>
      <UserAccount />
    </div>
  );
}
