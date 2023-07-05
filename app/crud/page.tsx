import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import CreateNote from "../components/CreateNote";
import Table from "../components/Table";
export default async function Data() {
  const session = await getServerSession(authOptions);
  if (!session) {
    // redirect("/api/auth/signin");
    return <p>You must be signed in...</p>;
  }
  return (
    <div>
      Data
      <CreateNote>
        <Table />
      </CreateNote>
    </div>
  );
}
