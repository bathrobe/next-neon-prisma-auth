"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
const deleteNote = async (id: string) => {
  try {
    const res = await fetch(`/api/post?id=${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

interface DeleteButtonProps {
  id: string;
}
export default async function DeleteButton({ id }: DeleteButtonProps) {
  const router = useRouter();
  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await deleteNote(id);
      router.refresh();
    } catch (err) {
      console.error(err);
      alert(err);
    }
  };
  return (
    <Button
      onClick={(e) => handleDelete(e)}
      className="ml-4 bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-900 text-yellow-50 mt-4"
    >
      Delete
    </Button>
  );
}
