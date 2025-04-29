import { cn } from "@/lib/utils";

export function Footer({ className }: { className?: string }) {
  return (
    <footer
      className={cn(
        "w-full py-4 text-center text-sm text-muted-foreground",
        className,
      )}
    >
      built with Neon 💚
    </footer>
  );
}
