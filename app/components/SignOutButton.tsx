"use client";
import { useSession, signOut } from "next-auth/react";
export default function SignOutButton() {
  const { status } = useSession();
  if (status === "authenticated") {
    return (
      <button className="pl-2" onClick={() => signOut()}>
        Sign out
      </button>
    );
  }
}
