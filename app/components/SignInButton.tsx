"use client";
import { useSession, signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function SignInButton() {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <>...</>;
  }

  if (status === "authenticated") {
    return (
      <Link href={`/dashboard`}>
        <Avatar>
          <AvatarImage src={session.user?.image ?? "/npc.png"} />
          <AvatarFallback>You</AvatarFallback>
        </Avatar>
      </Link>
    );
  }

  return <button onClick={() => signIn()}>Sign in</button>;
}
