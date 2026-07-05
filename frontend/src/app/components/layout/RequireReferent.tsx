import { Navigate } from "react-router";
import { useSession } from "../../context/SessionContext";

export function RequireReferent({ children }: { children: React.ReactNode }) {
  const { account } = useSession();

  if (account?.type !== "referent") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
