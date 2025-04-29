import Header from "@/components/app/header";
import NoteHeader from "@/components/app/note-header";
import {
  CurrentParagraph,
  Paragraph as WrittenParagraph,
} from "@/components/app/paragraph";
import type { NoteWithParagraphs, Paragraph } from "@/lib/api";
import { usePostgrest } from "@/lib/postgrest";
import { generateNameNote } from "@/lib/utils";
import { stackClientApp } from "@/lib/stack";
import { useUser } from "@stackframe/react";
import { useQuery } from "@tanstack/react-query";
import {
  createFileRoute,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";

type InProgressParagraph = {
  content: string;
  timestamp: string;
};

// Define the search params schema
export const Route = createFileRoute("/note")({
  component: NoteComponent,
  beforeLoad(ctx) {
    if (!ctx.context.accessToken) {
      return stackClientApp.redirectToSignIn();
    }
  },
  validateSearch: (search: Record<string, unknown>) => {
    return {
      id: search.id as string | undefined,
    };
  },
});

function NoteComponent() {
  const user = useUser({ or: "redirect" });
  const { id } = useSearch({ from: Route.fullPath });
  const navigate = useNavigate({ from: Route.fullPath });

  const [paragraphs, setParagraphs] = useState<Paragraph[]>([]);
  const [currentParagraph, setCurrentParagraph] = useState<InProgressParagraph>(
    {
      content: "",
      timestamp: new Date().toISOString(),
    },
  );
  const [currentTime, setCurrentTime] = useState<string>(
    new Date().toISOString(),
  );
  const postgrest = usePostgrest();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    retry: false,
    queryFn: async (): Promise<Omit<NoteWithParagraphs, "created_at">> => {
      if (!id || id === "new-note") {
        const { data, error } = await postgrest
          .from("notes")
          .insert({ title: generateNameNote() })
          .select(
            "id, title, shared, owner_id, paragraphs (id, content, created_at, note_id)",
          )
          .single();

        if (error) {
          throw error;
        }

        return data;
      }

      const { data, error } = await postgrest
        .from("notes")
        .select(
          "id, title, shared, owner_id, paragraphs (id, content, created_at, note_id)",
        )
        .eq("id", id)
        .single();

      if (error) {
        throw error;
      }

      return data;
    },
  });

  if (id !== note?.id && note?.id) {
    navigate({ search: { id: note?.id } });
  }

  // Load saved paragraphs
  useEffect(() => {
    if (note?.paragraphs) {
      setParagraphs(note.paragraphs);
    }
  }, [note]);

  // Load in-progress paragraph from localStorage
  useEffect(() => {
    if (id) {
      const savedParagraph = localStorage.getItem(
        `note-${id}-current-paragraph`,
      );
      if (savedParagraph) {
        try {
          setCurrentParagraph(JSON.parse(savedParagraph));
        } catch (e) {
          console.error("Failed to parse saved paragraph", e);
        }
      }
    }
  }, [id]);

  // Save in-progress paragraph to localStorage
  useEffect(() => {
    if (id && currentParagraph.content) {
      localStorage.setItem(
        `note-${id}-current-paragraph`,
        JSON.stringify(currentParagraph),
      );
    }
  }, [currentParagraph, id]);

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toISOString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle textarea input
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentParagraph({
      content: e.target.value,
      timestamp: currentTime,
    });
  };

  // Handle Enter key to submit paragraph
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      if (currentParagraph.content.trim() && id) {
        // Create a temporary paragraph to add to the UI immediately
        const tempParagraph = {
          id: crypto.randomUUID(), // Generate a temporary ID
          note_id: id,
          content: currentParagraph.content.trim(),
          created_at: new Date().toISOString(),
        };

        // Add new paragraph to state immediately
        setParagraphs([...paragraphs, tempParagraph]);

        // Clear current paragraph
        const previousParagraph = currentParagraph;
        setCurrentParagraph({
          content: "",
          timestamp: new Date().toISOString(),
        });

        // Remove from localStorage
        localStorage.removeItem(`note-${id}-current-paragraph`);

        // Save paragraph to database in the background
        (async () => {
          try {
            const { data, error } = await postgrest
              .from("paragraphs")
              .insert({
                note_id: id,
                content: previousParagraph.content.trim(),
              })
              .select("*")
              .single();

            if (error) {
              throw error;
            }

            if (data) {
              // Update the paragraph in state with the actual data from the server
              setParagraphs((currentParagraphs) =>
                currentParagraphs.map((p) =>
                  p.id === tempParagraph.id ? data : p,
                ),
              );
            }
          } catch (err) {
            console.error("Failed to save paragraph", err);
            // If saving fails, remove the temporary paragraph
            setParagraphs((currentParagraphs) =>
              currentParagraphs.filter((p) => p.id !== tempParagraph.id),
            );
            // Show error to user
            alert("Failed to save paragraph. Please try again.");
          }
        })();
      }
    }
  };

  if (isLoading) {
    return (
      <>
        <Header user={user} />
        <div className="my-10 max-w-2xl mx-auto">
          <div className="text-foreground/70">Loading...</div>
        </div>
      </>
    );
  }

  if (error || !note) {
    return navigate({ to: "/" });
  }

  return (
    <>
      <Header user={user} />
      <div className="flex flex-col gap-4">
        <NoteHeader
          id={note.id}
          title={note.title}
          shared={note.shared}
          owner_id={note.owner_id}
          user_id={user.id}
        />
        <main className="space-y-4">
          {paragraphs.map((para) => (
            <WrittenParagraph
              key={para.id}
              content={para.content}
              timestamp={para.created_at}
            />
          ))}
          <CurrentParagraph
            content={currentParagraph.content}
            timestamp={currentTime}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
          />
        </main>
      </div>
    </>
  );
}
