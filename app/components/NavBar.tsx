"use client";
import React from "react";
import SignInButton from "./SignInButton";
import SignOutButton from "./SignOutButton";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const Navbar = () => {
  const { status } = useSession();
  return (
    <nav className="py-4 px-4 md:px-0">
      <div className=" max-w-[900px] mx-auto mt-2 flex justify-between items-center">
        <div>App Starter</div>
        <div className="flex justify-evenly items-center">
          {status === "authenticated" ? (
            <Link className="pr-14 " href="/crud">
              CRUD
            </Link>
          ) : (
            ""
          )}
          <SignInButton />
          <SignOutButton />
        </div>
      </div>
      <Separator className="max-w-[900px] mx-auto bg-zinc-600 my-4" />
    </nav>
  );
};

export default Navbar;
