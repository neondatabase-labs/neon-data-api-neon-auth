import { AccessTokenContext } from "@/access-token-context";
import { PostgrestClient } from "@supabase/postgrest-js";
import { useContext } from "react";

const postgrestWithHeaders = (headers: Record<string, string>) => {
  return new PostgrestClient(import.meta.env.VITE_DATA_API_URL!, {
    fetch: async (...args) => {
      const [url, options = {}] = args;
      return fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          ...headers,
        },
      });
    },
  });
};

export function usePostgrest() {
  const accessToken = useContext(AccessTokenContext);

  return postgrestWithHeaders({
    Authorization: `Bearer ${accessToken}`,
  });
}
