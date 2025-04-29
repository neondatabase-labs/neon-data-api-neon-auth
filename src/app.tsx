import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode, useContext } from "react";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

import { AccessTokenProvider } from "@/access-token-provider";
import { stackClientApp } from "@/lib/stack";
import { StackProvider } from "@stackframe/react";
import { AccessTokenContext } from "./access-token-context";

// Create a new router instance
const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  context: {
    accessToken: null,
  },
});

// Create a client
const queryClient = new QueryClient();

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <StackProvider app={stackClientApp}>
          <AccessTokenProvider>
            <RouterWithAuth />
          </AccessTokenProvider>
        </StackProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}

function RouterWithAuth() {
  const accessToken = useContext(AccessTokenContext);

  return <RouterProvider router={router} context={{ accessToken }} />;
}

export default App;
