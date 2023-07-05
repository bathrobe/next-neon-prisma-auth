"use client";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import * as z from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
const formSchema = z.object({
  text: z.string().min(2).max(50),
});
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
interface EditModalProps {
  note: {
    id: string;
    text: string;
  };
}

export default function EditModal({ note }: EditModalProps) {
  const router = useRouter();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const editNote = async (text: string) => {
    const data = { id: note?.id!, text: text };
    try {
      const res = await fetch("/api/post", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: data }),
      });
      setIsPopoverOpen(false);
      return res.json();
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  async function handleSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      await editNote(values.text);
      router.refresh();
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: note.text,
    },
  });
  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Button className="bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-900 text-yellow-50 mt-4">
          Edit
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 bg-zinc-900 text-yellow-50">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-zinc-900 text-yellow-50"
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-900 text-yellow-50 mt-4"
            >
              {loading ? "Loading" : "Submit"}
            </Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}
