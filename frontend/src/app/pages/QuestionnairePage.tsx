import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSession } from "../context/SessionContext";
import { ChercheurQuestionnaire } from "./ChercheurQuestionnaire";
import { AccompagnantQuestionnaire } from "./AccompagnantQuestionnaire";

export function QuestionnairePage() {
  const navigate = useNavigate();
  const { account, profile } = useSession();

  useEffect(() => {
    if (!account) navigate("/creer-un-compte");
  }, [account, navigate]);

  if (!account) return null;

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      {account.type === "chercheur" ? (
        <ChercheurQuestionnaire
          pseudonyme={account.pseudonyme}
          age={account.age}
          existingProfile={profile?.type === "chercheur" ? profile : undefined}
        />
      ) : (
        <AccompagnantQuestionnaire
          pseudonyme={account.pseudonyme}
          age={account.age}
          existingProfile={profile?.type === "accompagnant" ? profile : undefined}
        />
      )}
    </div>
  );
}
