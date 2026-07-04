import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { AccountType, Profile } from "../types";

const STORAGE_KEY = "repair-ai-session";

interface Account {
  type: AccountType;
  pseudonyme: string;
  age: number;
}

interface SessionState {
  account: Account | null;
  profile: Profile | null;
}

interface SessionContextValue extends SessionState {
  setAccount: (account: Account) => void;
  setProfile: (profile: Profile) => void;
  reset: () => void;
}

const SessionContext = createContext<SessionContextValue | undefined>(undefined);

function loadInitialState(): SessionState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // stockage indisponible ou corrompu : on repart d'un état vide
  }
  return { account: null, profile: null };
}

export function SessionProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SessionState>(loadInitialState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const setAccount = (account: Account) => setState((prev) => ({ ...prev, account }));
  const setProfile = (profile: Profile) => setState((prev) => ({ ...prev, profile }));
  const reset = () => setState({ account: null, profile: null });

  return (
    <SessionContext.Provider value={{ ...state, setAccount, setProfile, reset }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession doit être utilisé dans un SessionProvider");
  return ctx;
}
