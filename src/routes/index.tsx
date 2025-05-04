import Header from "@/components/app/header";
import NotesList from "@/components/app/notes-list";
import type { Note } from "@/lib/api";
import { usePostgrest } from "@/lib/postgrest";
import { stackClientApp } from "@/lib/stack";
import { useUser } from "@stackframe/react";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  // Prevent access to this route if the user is not authenticated
  beforeLoad(ctx) {
    if (!ctx.context.accessToken) {
      return stackClientApp.redirectToSignIn();
    }
  },
});

function useNotes() {
  const postgrest = usePostgrest();
  const user = useUser({ or: "redirect" });
  return useQuery({
    queryKey: ["notes"],
    queryFn: async (): Promise<Array<Note>> => {
      const { data, error } = await postgrest
        .from("notes")
        .select("id, title, created_at, owner_id, shared")
        .eq("owner_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      return data;
    },
  });
}

function RouteComponent() {
  const user = useUser({ or: "redirect" });
  const { data, error, status, isLoading } = useNotes();

  return (
    <>
      <Header user={user} />
      {(status === "pending" || isLoading) && (
        <div className="text-foreground/70">Loading...</div>
      )}
      {status === "error" && (
        <div className="text-foreground/70">Error: {error.message}</div>
      )}
      {status === "success" && <NotesList user={user} notes={data} />}
    </>
  );
}
