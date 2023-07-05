import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import EditModal from "./EditModal";
import DeleteButton from "./DeleteButton";

export default async function Table() {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email!,
    },
  });
  const notes = await prisma.note.findMany({
    where: {
      authorId: user?.id,
    },
  });

  const noteList = notes
    .sort((a, b) => {
      // sorts by note.dateCreated
      return a.dateCreated - b.dateCreated;
    })
    .map((note) => {
      return (
        <div className="my-10 ">
          <div className="pt-2">{note.text}</div>
          <EditModal note={note} />
          <DeleteButton id={note.id} />
        </div>
      );
    });
  return <div className="mt-12">{noteList}</div>;
}
