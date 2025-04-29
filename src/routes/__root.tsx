import { StackProvider, StackTheme } from "@stackframe/react";
import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";

import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { stackClientApp } from "@/lib/stack";
import { Footer } from "@/components/Footer";

export const Route = createRootRouteWithContext<{
  accessToken: string | null;
}>()({
  component: () => (
    <StackProvider app={stackClientApp}>
      <StackTheme>
        <div className="min-h-screen flex flex-col">
          <main className="max-w-2xl mx-auto p-4 mt-14 flex-1">
            <header className="mb-8">
              <Link to="/">
                <h3>note.</h3>
              </Link>
            </header>
            <Outlet />
          </main>
          <Footer />
        </div>
        <TanStackRouterDevtools />
      </StackTheme>
    </StackProvider>
  ),
});
