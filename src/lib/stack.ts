import { StackClientApp } from "@stackframe/react";
import { useNavigate } from "@tanstack/react-router";

export const stackClientApp = new StackClientApp({
  // You should store these in environment variables based on your project setup
  projectId: import.meta.env.VITE_PUBLIC_STACK_PROJECT_ID,
  publishableClientKey: import.meta.env
    .VITE_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY,
  tokenStore: "cookie",
  redirectMethod: {
    useNavigate: () => {
      const navigate = useNavigate();
      return (to: string | { to: string }) => {
        if (typeof to === "string") {
          return navigate({ to });
        }
        return navigate(to);
      };
    },
  },
});
