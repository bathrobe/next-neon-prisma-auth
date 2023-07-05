"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
const createNote = async (text: string) => {
  const data = { text };
  try {
    const res = await fetch("/api/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: data }),
    });
    return res.json();
  } catch (err) {
    console.log(err);
    throw err;
  }
};
interface Props {
  children: React.ReactNode;
}
// this is how react typescript treats children
export default function CreateNote({ children }: Props) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createNote(value);
      setValue(""); // Clear the input after successful submission
      router.refresh();
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-zinc-900 text-yellow-50">
        <Input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="bg-zinc-900 text-yellow-50"
          required
          disabled={loading}
          minLength={5}
          maxLength={1000}
        />
        <Button
          type="submit"
          className="bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-900 text-yellow-50 mt-4"
          disabled={loading}
        >
          {loading ? "Loading..." : "Create Note"}
        </Button>
      </form>
      {children}
    </>
  );
}
