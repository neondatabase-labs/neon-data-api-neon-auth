import Header from "@/components/app/header";
import NotesList from "@/components/app/notes-list";
import type { Note } from "@/lib/api";
import { client } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  // Prevent access to this route if the user is not authenticated
  async beforeLoad() {
    const session = await client.auth.getSession();
    if (!session.data) {
      throw redirect({
        to: "/signin",
      });
    }
  },
});

function useNotes() {
  const session = client.auth.useSession();
  return useQuery({
    queryKey: ["notes"],
    queryFn: async (): Promise<Array<Note>> => {
      if (!session.data) {
        throw new Error("User is not authenticated");
      }
      const { data, error } = await client
        .from("notes")
        .select("id, title, created_at, owner_id, shared")
        .eq("owner_id", session.data.user.id)
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      return data as Array<Note>;
    },
  });
}

function RouteComponent() {
  const session = client.auth.useSession();
  const { data, error, status, isLoading } = useNotes();

  if (!session.data?.user) {
    return null;
  }

  return (
    <>
      <Header name={session.data.user.name} />
      {(status === "pending" || isLoading) && (
        <div className="text-foreground/70">Loading...</div>
      )}
      {status === "error" && (
        <div className="text-foreground/70">Error: {error.message}</div>
      )}
      {status === "success" && <NotesList notes={data} />}
    </>
  );
}
