import { NoteTitle } from "@/components/app/note-title";
import { Toggle } from "@/components/ui/toggle";
import { Note } from "@/lib/api";
import { client } from "@/lib/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Share2 } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  id: string;
  title: string;
  shared: boolean;
  owner_id: string;
  user_id: string;
  onShareToggle?: (isShared: boolean) => void;
};

export default function NoteHeader({
  id,
  title,
  shared,
  owner_id,
  user_id,
  onShareToggle,
}: Props) {
  // Optimistic UI state for shared toggle
  const [optimisticShared, setOptimisticShared] = useState<boolean | null>(
    null,
  );

  useEffect(() => {
    if (shared !== undefined && optimisticShared === null) {
      setOptimisticShared(shared);
    }
  }, [shared, optimisticShared]);

  // Determine the current shared state (use optimistic value if available)
  const isShared =
    optimisticShared !== null ? optimisticShared : shared || false;
  const queryClient = useQueryClient();

  const toggleShareMutation = useMutation({
    mutationFn: async (newSharedState: boolean) => {
      const { error } = await client
        .from("notes")
        .update({
          shared: newSharedState,
        })
        .eq("id", id);

      if (error) throw error;
      return { shared: newSharedState };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["note", id], data);

      queryClient.setQueryData(["notes"], (old: Note[]) =>
        old.map((note) => (note.id === id ? data : note)),
      );

      if (onShareToggle) {
        onShareToggle(data.shared);
      }
    },
    onError: () => {
      // Revert to original state if there's an error
      setOptimisticShared(shared);
    },
  });

  return (
    <header className="flex items-center justify-between">
      <NoteTitle
        id={id}
        title={title}
        shared={isShared}
        owner={user_id === owner_id}
      />
      {user_id === owner_id && (
        <Toggle
          pressed={isShared}
          className="cursor-pointer h-6 w-6 min-w-6"
          onPressedChange={() => {
            const newSharedState = !isShared;
            // Update local state immediately for instant UI feedback
            setOptimisticShared(newSharedState);
            // Then trigger the mutation
            toggleShareMutation.mutate(newSharedState);
          }}
        >
          <Share2 className="w-3 h-3" />
        </Toggle>
      )}
    </header>
  );
}
