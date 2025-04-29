import type { CurrentUser } from "@stackframe/react";

export default function Header({ user }: { user: CurrentUser }) {
  return (
    <header className="flex flex-col gap-6 mb-14">
      <div className="flex items-center justify-between">
        <h3>Welcome {user.displayName?.split(" ")[0]}</h3>
        <button
          type="button"
          className="text-foreground/70 font-normal cursor-pointer"
          onClick={() => user.signOut()}
        >
          Sign out
        </button>
      </div>
      <p className="text-foreground/70">
        Your minimalist note-taking app that automatically records timestamps
        for each of your notes.
      </p>
    </header>
  );
}
