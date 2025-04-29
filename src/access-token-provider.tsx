import { AccessTokenContext } from "@/access-token-context";
import { useUser } from "@stackframe/react";
import { useEffect, useState } from "react";

export function AccessTokenProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useUser();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAccessToken = async () => {
      if (user) {
        setAccessToken((await user.getAuthJson()).accessToken);
      }
      setIsLoading(false);
    };

    fetchAccessToken();

    const intervalId = setInterval(fetchAccessToken, 1000 * 60);

    return () => clearInterval(intervalId);
  }, [user]);

  if (isLoading) {
    return null;
  }

  return (
    <AccessTokenContext.Provider value={accessToken}>
      {children}
    </AccessTokenContext.Provider>
  );
}
