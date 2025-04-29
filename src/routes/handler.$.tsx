import { createFileRoute, useLocation } from "@tanstack/react-router";
import { StackHandler } from "@stackframe/react";
import { stackClientApp } from "@/lib/stack";

export const Route = createFileRoute("/handler/$")({
  component: HandlerRoutes,
});

function HandlerRoutes() {
  const location = useLocation();

  return (
    <StackHandler app={stackClientApp} location={location.pathname} fullPage />
  );
}
