"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/images/logo.png";
import { usePathname } from "next/navigation";
import { MdHome } from "react-icons/md";
import { BiSolidDetail } from "react-icons/bi";
import { FaRegListAlt } from "react-icons/fa";
import clsx from "clsx";
import UserAccount from "@/app/ui/patient/navbar/user-account";

const links = [
  { name: "Personal", href: "/doctor/profile", icon: BiSolidDetail },
  { name: "Home", href: "/doctor/dashboard", icon: MdHome },
  { name: "Register", href: "/doctor/patientlist", icon: FaRegListAlt },
];

export default function DocNavBar() {
  const pathname = usePathname();

  return (
    <div
      className=" flex
      w-full flex-wrap items-center justify-between rounded bg-white p-2 shadow-md "
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
