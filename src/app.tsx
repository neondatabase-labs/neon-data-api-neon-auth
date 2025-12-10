import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

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
        <RouterWithAuth />
      </QueryClientProvider>
    </StrictMode>
  );
}

function RouterWithAuth() {
  return <RouterProvider router={router} />;
}

export default App;
