import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email!,
    },
  });
  const body = await request.json();
  const { data } = body;
  const { text } = data;
  await prisma.note.create({
    data: {
      text: text!,
      authorId: user?.id!,
    },
  });

  return NextResponse.json({ msg: "Post created" });
}

export async function PUT(request: Request) {
  // send note id and text to update
  const body = await request.json();
  const { data } = body;
  const { id, text } = data;
  try {
    const res = await prisma.note.update({
      where: {
        id: id!,
      },
      data: {
        text: text!,
      },
    });
    return NextResponse.json({ msg: `Post ${res?.id} updated`, data: res });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ msg: `Error: ${e}` });
  }
}

export async function DELETE(request: Request) {
  // we will use params to access the data passed to the dynamic route
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  try {
    const res = await prisma.note.delete({
      where: {
        id: id!,
      },
    });
    return NextResponse.json({ msg: `Post ${res.id} deleted` });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ msg: `Error: ${e}` });
  }
}
